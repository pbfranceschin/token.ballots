import { ethers } from 'hardhat';
import { MyToken__factory } from '../typechain-types';

const main = async () => {
    // DEPLOY
    const [ owner, account ] = await ethers.getSigners();
    const contractFactory = new MyToken__factory(owner);
    const contract = await contractFactory.deploy();
    const receipt = await contract.deployTransaction.wait();
    console.log(
        '\n---',
        'contract deployed.\n - address:',
        contract.address,
        '\n - tx:',
        receipt.transactionHash,
        '\n - block',
        receipt.blockNumber,
        '\n ---'
    );
    
    
    const amount = 10;
    // MINT
    console.log('minting...');
    const mint = await contract.mint(account.address, amount );
    const mintReceipt = await mint.wait();
    console.log(
        `${amount} minted to ${account.address} at tx ${mintReceipt.transactionHash}\n ---`
    );
    const bal = await contract.balanceOf(account.address);
    console.log(`account ${account.address} balance updated to ${bal}\n ---`);
    // DELEGATE
    console.log('delegating');
    const delegate = await contract.connect(account).delegate(account.address);
    const delegateReceipt = await delegate.wait();
    console.log(`delegated at tx ${delegateReceipt.transactionHash}\n`);
    // GET VOTES
    console.log('checking votes power...')
    const votes = await contract.getVotes(account.address);
    const voteNum = votes.toNumber();
    console.log('votes power is', voteNum);
    
    
}

main().catch((err) => {
    console.error(err)
    process.exitCode = 1
});
