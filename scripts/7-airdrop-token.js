import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0xd7f2fbF4e986DB340F0745F598C2bE2ab05ef602",
);

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
  "0xAB08A211F7916ddb0843a9b416A33F072A22E06B",
);

(async () => {
  try {
    // Grab all the addresses of people who own our membership NFT, which has 
    // a tokenId of 0.
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
  
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }
    
    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
      
      // Set up the target.
      const airdropTarget = {
        address,
        // Remember, we need 18 decimal placees!
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
      };
  
      return airdropTarget;
    });
    
    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...")
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();