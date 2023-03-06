// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
///

interface IMyToken {
    function getPastVotes(address account, uint256 blockNumber) external view returns (uint256);
}

contract TokenizedBallot {
    

    struct Proposal {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    mapping (address => uint256) public votingPowerSpent;
    
    uint256 public blockTarget;
    IMyToken public tokenContract;
    Proposal[] public proposals;

    /// Create a new ballot to choose one of `proposalNames`.
    constructor(bytes32[] memory proposalNames, address _tokenContract, uint256 _blockTarget) {
        tokenContract = IMyToken(_tokenContract);
        for (uint i = 0; i < proposalNames.length; i++) {
            blockTarget = _blockTarget;
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function votePower(address account) public view returns(uint256) {
        return tokenContract.getPastVotes(account, blockTarget) - votingPowerSpent[account];
    } 


    function vote(uint proposal, uint256 amount) external {
        require(votePower(msg.sender) > 0, 'caller does not have vote power');
        votingPowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() external view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}