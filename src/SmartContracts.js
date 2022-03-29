import tokenABI from './assets/data/tokenABI.json';
import stakingABI from './assets/data/stakingABI.json';
import stakingV2ABI from './assets/data/stakingV2ABI.json';
import { ethers } from "ethers";


async function V2_getStakedDataById(account, id) {
    const bigNumberValue = ethers.BigNumber.from(id.toString());
    const contract = SC.stakingContractV2;
  
    try {
      return await contract.viewUserStakeAny(account, bigNumberValue);
    } catch (err) {
      throw err;
    }
}

async function V2_getAvialableRewardById(account, id, shiftTime = 0) {
    const bigNumberValue = ethers.BigNumber.from(id.toString());
    const contract = SC.stakingContractV2;
  
    try {
      return await contract.calcRewardByIndex(account, bigNumberValue, ethers.BigNumber.from(shiftTime));
    } catch (err) { throw err }
}

async function V2_getTotalRewardsValue(account, shiftTime = 0) {
    let totalRewards = ethers.BigNumber.from(0);
  
    try {
        const stakesCount = await SC.stakingContractV2.getCountStake(account);

        for (let i = 0; i < stakesCount; i++) {
            const { reward } = await V2_getAvialableRewardById(account, i, shiftTime);
            totalRewards = totalRewards.add(reward.toString());
        }

        return totalRewards.toString();
    } catch (err) { throw err }
}

async function V2_getUnlockedReward(account, count, shiftTime = 0) {
    let totalRewards = ethers.BigNumber.from(0);
  
    try {
        for (let i = 0; i < count; i++) {
            const { reward } = await V2_getAvialableRewardById(account, i, shiftTime);
            totalRewards = totalRewards.add(reward.toString());
        }

        return totalRewards.toString();
    } catch (err) { throw err }
}

async function V2_getAllStakesData(account) {
    const stakes = [];

    try {
      const stakesCount = await SC.stakingContractV2.getCountStake(account);
  
      for (let i = 0; i < stakesCount; i++) {
        const stakeData = await V2_getStakedDataById(account, i);
        stakes.push(stakeData);
      }
  
      return stakes;
    } catch (err) { throw err }
}


export class SC {
    static coefficient = 0.000000000000000001;
    static dailyDistribution = 1e27;
    static tokenContract;
    static stakingContract;
    static stakingContractV2;
    static config = {
        mainChainId: 56,
        tokenContractAddress: '0xDc3541806D651eC79bA8639a1b495ACf503eB2Dd',
        stakingContractAddress: '0xaA03e1110de1515976fAEEA19817dA81AfA44dbE',
        _stakingContractAddress: '0xa21523313855C0682D549ef2E9F688Ba0ee92273',
        stakingContractV2Address: '0x6CCF448bAE762431B2Bae046b85fD730313Cbef3',
        mainWallet: '0x8B4754ae99F1e595481029c6835C6931442f5f02',
        timestamp: 1648163253
    };

    static inStake = 0;
    static inStakeV2 = 0;

    static async init(_provider) {
        const provider = new ethers.providers.Web3Provider(_provider), signer = provider.getSigner();

        if (!SC.tokenContract) {
            SC.tokenContract = new ethers.Contract(SC.config.tokenContractAddress, tokenABI, signer);
            SC.stakingContract = new ethers.Contract(SC.config.stakingContractAddress, stakingABI, signer);
            SC.stakingContractV2 = new ethers.Contract(SC.config.stakingContractV2Address, stakingV2ABI, signer);
        }
    }

    static async allowance(account) {
        const contract = SC.tokenContract;

        try {
            let approvedRaw = await contract.allowance(account, SC.stakingContract.address);
            console.log('APPROVED_VALUE', approvedRaw);
            if (approvedRaw) {
                let approved = parseInt(approvedRaw._hex, '16');
                if (approved) return true;
            }
            return false;
        } catch(e) { throw e }
    }

    static async allowanceV2(account) {
        const contract = SC.tokenContract;

        try {
            let approvedRaw = await contract.allowance(account, SC.stakingContractV2.address);
            console.log('APPROVED_VALUE', approvedRaw);
            if (approvedRaw) {
                let approved = parseInt(approvedRaw._hex, '16');
                if (approved) return true;
            }
            return false;
        } catch(e) { throw e }
    }

    static async approve() {
        const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
        const contract = SC.tokenContract;
    
        try {
            let approval = await contract.approve(SC.config.stakingContractAddress, bigNumberValue);
            return !!approval;
        } catch (e) { throw e }
    }

    static async approveV2() {
        const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
        const contract = SC.tokenContract;
    
        try {
            let approval = await contract.approve(SC.config.stakingContractV2Address, bigNumberValue);
            return !!approval;
        } catch (e) { throw e }
    }

    static async getEarned(account) {
        const contract = SC.stakingContract;

        try {
            let earned = await contract.earned(account);

            return parseInt(earned._hex, '16');
        } catch(e) { throw e }
    }

    static async getInStake(account) {
        const contract = SC.stakingContract;

        try {
            let balance = await contract.balanceOf(account);
            SC.inStake = +parseInt(balance._hex, '16').toString().slice(0, -18);
            return +parseInt(balance._hex, '16').toString().slice(0, -18);
        } catch(e) { throw e }
    }

    static async getEarnedV2(account) {
        try {
            let totalRewards = await V2_getTotalRewardsValue(account, 2678400);
            return totalRewards * SC.coefficient;
        } catch(e) { throw e }
    }

    static async getInStakeV2(account) {
        try {
            let allStakesData = await V2_getAllStakesData(account);
            let balance = allStakesData.reduce((acc, stakedToken) => {
                if (!(stakedToken._endTime * 1)) acc += stakedToken._amount * SC.coefficient;
                return acc;
            }, 0);
            SC.inStakeV2 = parseInt(balance);
            return balance;
        } catch(e) { throw e }
    }

    static async stake(account, amount) {
        const contract = SC.stakingContract;
        const bigNumberValue = ethers.utils.parseEther(amount.toString());

        try {
            await contract.stake(bigNumberValue);
            return true;
        } catch(e) { throw e }
    }

    static async stakeV2(account, amount) {
        const contract = SC.stakingContractV2;
        const bigNumberValue = ethers.utils.parseEther(amount.toString());

        try {
            await contract.stake(account, bigNumberValue);
            return true;
        } catch(e) { throw e }
    }

    static async harvest(account) {
        const contract = SC.stakingContract;

        try {
            await contract.getReward();
            return true;
        } catch(e) { throw e }
    }

    static async withdraw(account, amount) {
        const contract = SC.stakingContract;
        const bigNumberValue = ethers.utils.parseEther(amount.toString());

        try {
            await contract.withdraw(bigNumberValue);
            return true;
        } catch(e) { throw e }
    }

    static async harvestV2(account) {
        const contract = SC.stakingContractV2;
        try {
            await contract.getReward(account);
            return true;
        } catch(e) { throw e }
    }

    static async withdrawV2(account) {
        const contract = SC.stakingContractV2;
        try {
            await contract.unStake(account);
            return true;
        } catch(e) { throw e }
    }

    static async APR() {
        const contract = SC.stakingContract;
        try {
            let rewardPerToken = await contract.rewardPerToken();
            rewardPerToken = parseInt(rewardPerToken._hex, '16');
            let APR = rewardPerToken / ( 7 / 86400 ) * 360 * 100;
            return APR;
        } catch(e) { throw e }
    }

    static async APRV2() {
        const contract = SC.stakingContractV2;

        try {
            let byDay = await contract.rewardTokensByDay();
            let totalStacked = await contract.totalStakedTokens();
            let APR = Math.floor(((byDay * SC.coefficient * 365) / + (totalStacked * SC.coefficient)) * 100) || 0;
            return APR;
        } catch(e) { throw e }
    }

    static async getUnlockedRewardV2(account) {
        const contract = SC.stakingContractV2;
        
        try {
            let totalRewards = await V2_getUnlockedReward(account, 11);
            return totalRewards;
        } catch(e) { throw e }
    }
}