import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from 'dotenv';

const defaultNetwork = 'hardhat';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.18",

  defaultNetwork,

  networks: {
    localhost: {
      chainId: 31337,
    },

    hardhat: {
      chainId: 1337,
    },

  },

  // namedAccounts: {
  //   deployer: {
  //     default: 0, // here this will by default take the first account as deployer
  //   },
  //   tokenOwner: 1,
    
  // },

  
};

export default config;
