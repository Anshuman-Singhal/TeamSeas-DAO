import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xd7f2fbF4e986DB340F0745F598C2bE2ab05ef602",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "TeamSeas Whale",
        description: "This NFT will give you access to TeamSeasDAO!",
        image: readFileSync("scripts/assets/whale.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()