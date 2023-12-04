import { account, publicClient, walletClient } from "./viem.js";
import { bitnounABI } from "./abi/bitnoun.js";

console.log("🚀 Starting auto bidder");

const BASIC_ARGS = {
  address: "0xA227441A4FA9b44ceC257D539dF8e4F80A491b80",
  abi: bitnounABI,
} as const;

publicClient.watchBlocks({
  onBlock: async (block) => {
    console.log(block.number + "\n");

    try {
      const auctionState = await publicClient.readContract({
        ...BASIC_ARGS,
        functionName: "auction",
      });

      // console.log({ auctionState });

      const unixTimestamp = Math.floor(new Date().getTime() / 1000);

      // if (unixTimestamp < auctionState[4] || auctionState[4] === 0) {
      //   console.log("auction timestamp end: ", auctionState[4]);
      //   console.log("current time: ", unixTimestamp);
      //   console.log(unixTimestamp > auctionState[4]);
      //   console.log("auction is active, cannot bid");
      //   return;
      // }

      // console.log("auction inactive, bidding");

      // const result = await walletClient.writeContract({
      //   ...BASIC_ARGS,
      //   functionName: "settleCurrentAndCreateNewAuction",
      //   account,
      // });

      // if (result) {
      //   console.log(`auction started, tx hash: ${result}`);

      const reservePrice = await publicClient.readContract({
        ...BASIC_ARGS,
        functionName: "reservePrice",
      });

      //   // await walletClient.writeContract({
      //   //   ...BASIC_ARGS,
      //   //   functionName: "createBid",
      //   //   account,
      //   //   args: [reservePrice],
      //   // });
      // }
      console.log(reservePrice);

      await walletClient.writeContract({
        ...BASIC_ARGS,
        functionName: "createBid",
        account,
        args: [reservePrice],
      });

      // min bid: 0.0001
    } catch (e: unknown) {
      console.log("error with request");
      console.log(e);
    }
  },
});
