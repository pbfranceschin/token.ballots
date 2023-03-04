import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { argv } from 'node:process';
import { MyToken__factory, TokenizedBallot__factory } from '../typechain-types';

dotenv.config({path: '../.env'});

const network = "sepolia";
const account = "0x099A294Bffb99Cb2350A6b6cA802712D9C96676A";
const privateKey = process.env.PRIVATE_KEY;
const apiKey = process.env.ALCHEMY_API_KEY;


// SCRIPT SHOULD BE CALLED WITH ARGS (IN ORDER)
// proposal_1 , ... , proposal_i , blockTarget
const main =async () => {
    const args = process.argv.slice(2);
    console.log('args:', args);
    const proposals: any[] = [];
    for (let i=0; i<args.length - 1; i++){
        proposals.push(args[i]);
    }
    console.log(proposals);
    console.log(privateKey);
    console.log(apiKey);

    // if(!privateKey || privateKey.length <= 0) throw new Error("missing enviroment: PRIVATE_KEY");
    // if(!apiKey || apiKey.length <= 0) throw new Error("missing enviroment: API_KEY");

    // const provider = new ethers.providers.AlchemyProvider(network, apiKey);
    // const signer = new ethers.Wallet(privateKey, provider);
    
    // const tokenFactory = new MyToken__factory(signer);
    // console.log('deploying token contract');
    // const tokenContract = await tokenFactory.deploy();
    // console.log('pending...');
    // const receipt = await tokenContract.deployTransaction.wait();
    // console.log(`contract deployed to ${network} at address ${tokenContract.address} in tx ${receipt.transactionHash} at block ${receipt.blockNumber}`)

    // const ballotFactory = new TokenizedBallot__factory(signer);
    // console.log('deploying ballot contract...');
    // const ballotContract = await ballotFactory.deploy();
    


}

main().catch((err) => {
    console.error(err)
    process.exitCode = 1
});