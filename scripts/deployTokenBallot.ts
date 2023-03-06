import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { argv } from 'node:process';
import { MyToken__factory, TokenizedBallot__factory } from '../typechain-types';

dotenv.config({path: __dirname+'/../.env'});

const network = "sepolia";
const privateKey = process.env.PRIVATE_KEY_1;
const apiKey = process.env.INFURA_API_KEY;


// SCRIPT SHOULD BE CALLED WITH ARGS (IN ORDER)
// proposal_1 , ... , proposal_i , 
const main = async () => {
    const args = process.argv.slice(2);
    if(args.length <= 0) throw new Error("missing arguments proposalNames");
    const proposals: any[] = [];
    args.map((e) => {
        proposals.push(ethers.utils.formatBytes32String(e));
    })
    
    if(!privateKey || privateKey.length <= 0) throw new Error("missing enviroment: PRIVATE_KEY");
    if(!apiKey || apiKey.length <= 0) throw new Error("missing enviroment: API_KEY");

    const provider = new ethers.providers.InfuraProvider(network, apiKey);
    const signer = new ethers.Wallet(privateKey, provider);

    const lastBLock = await provider.getBlock("latest");
    const blockTarget = lastBLock.number + 20;
    console.log('- current block', lastBLock.number, '\n- blockTarget', blockTarget);
    
    // const bal = await provider.getBalance(signer.address);
    // console.log(bal.toString());
    
    const tokenFactory = new MyToken__factory(signer);
    console.log('---\ndeploying token contract');
    const tokenContract = await tokenFactory.deploy();
    console.log('pending...');
    const tokenReceipt = await tokenContract.deployTransaction.wait();
    console.log(`contract deployed to ${network} at address ${tokenContract.address} in tx ${tokenReceipt.transactionHash} at block ${tokenReceipt.blockNumber}`);

    const ballotFactory = new TokenizedBallot__factory(signer);
    console.log('---\ndeploying ballot contract...');
    const ballotContract = await ballotFactory.deploy(proposals, tokenContract.address, blockTarget);
    console.log('pending...');
    const ballotReceipt = await ballotContract.deployTransaction.wait();
    console.log(`contract deployed to ${network} at address ${ballotContract.address} in tx ${ballotReceipt.transactionHash} at block ${ballotReceipt.blockNumber}`);
    
}


main().catch((err) => {
    console.error(err)
    process.exitCode = 1
});