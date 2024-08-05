import { beginCell, toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { NFTItem } from "./output/nft_NFTItem";
import { inspect } from "util";
import exp from "constants";

describe("contract", () => {
  it("should deploy correctly", async () => {
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let master = system.treasure("master");
    let nftContract = system.open(await NFTItem.fromInit(master.address, 0n, beginCell().storeUint(2, 8).endCell(), owner.address, master.address, 5n, 100n));

    let nft_tracker = system.track(nftContract.address);

    await nftContract.send(master, { value: toNano(0.1) }, { $$type: "Deploy", queryId: 0n });
    await system.run();

    let nft_events = nft_tracker.collect();
    console.log(inspect(nft_events, true, null, true));

    let result = await nftContract.getGetNftData();
    expect(result.deployed).toBeTruthy();
    expect(result.index).toEqual(0n);
    expect(result.collection.equals(master.address)).toBeTruthy();
    expect(result.owner.equals(owner.address)).toBeTruthy();
    expect(result.content.toBoc()).toEqual(beginCell().storeUint(2, 8).endCell().toBoc());


    let owner2 = system.treasure("owner2");
    await nftContract.send(owner, { value: toNano(1) }, {
      $$type: "NftTransfer", query_id: 1n, new_owner: owner2.address, response_destination: owner.address,
      custom_payload: beginCell().storeUint(0, 32).storeStringTail("Test message 1").endCell(),
      forward_amount: toNano(0.05),
      forward_payload: beginCell().storeUint(0, 32).storeStringTail("Test message 2").endCell()
    });
    await system.run();

    let owner_events = nft_tracker.collect();
    console.log(inspect(owner_events, true, null, true));

    result = await nftContract.getGetNftData();

    expect(result.owner.equals(owner2.address)).toBeTruthy();

  });
});
