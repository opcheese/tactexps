import { beginCell } from "@ton/core";

export function createOffchainContent(str: string) {
    let content = beginCell().storeUint(1, 8).storeStringTail(str).endCell();
    return content;
}