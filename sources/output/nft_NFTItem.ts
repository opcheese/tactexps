import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type NftTransfer = {
    $$type: 'NftTransfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeNftTransfer(src: NftTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeRef(src.forward_payload);
    };
}

export function loadNftTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadRef();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleNftTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleNftTransfer(source: NftTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserNftTransfer(): DictionaryValue<NftTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadNftTransfer(src.loadRef().beginParse());
        }
    }
}

export type NftExcesses = {
    $$type: 'NftExcesses';
    query_id: bigint;
}

export function storeNftExcesses(src: NftExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function loadTupleNftExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function storeTupleNftExcesses(source: NftExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftExcesses(): DictionaryValue<NftExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadNftExcesses(src.loadRef().beginParse());
        }
    }
}

export type NftGetStaticData = {
    $$type: 'NftGetStaticData';
    query_id: bigint;
}

export function storeNftGetStaticData(src: NftGetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function loadTupleNftGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function storeTupleNftGetStaticData(source: NftGetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetStaticData(): DictionaryValue<NftGetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftOwnershipAssigned = {
    $$type: 'NftOwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
}

export function storeNftOwnershipAssigned(src: NftOwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeRef(src.forward_payload);
    };
}

export function loadNftOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.loadRef();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleNftOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleNftOwnershipAssigned(source: NftOwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserNftOwnershipAssigned(): DictionaryValue<NftOwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadNftOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type NftReportStaticData = {
    $$type: 'NftReportStaticData';
    query_id: bigint;
    index: bigint;
    collection: Address;
}

export function storeNftReportStaticData(src: NftReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collection);
    };
}

export function loadNftReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index = sc_0.loadUintBig(256);
    let _collection = sc_0.loadAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function loadTupleNftReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function storeTupleNftReportStaticData(source: NftReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserNftReportStaticData(): DictionaryValue<NftReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftGetRoyaltyParams = {
    $$type: 'NftGetRoyaltyParams';
    query_id: bigint;
}

export function storeNftGetRoyaltyParams(src: NftGetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleNftGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleNftGetRoyaltyParams(source: NftGetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetRoyaltyParams(): DictionaryValue<NftGetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftReportRoyaltyParams = {
    $$type: 'NftReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeNftReportRoyaltyParams(src: NftReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadNftReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleNftReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleNftReportRoyaltyParams(source: NftReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserNftReportRoyaltyParams(): DictionaryValue<NftReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftDestroy = {
    $$type: 'NftDestroy';
    query_id: bigint;
}

export function storeNftDestroy(src: NftDestroy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520377210, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftDestroy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520377210) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function loadTupleNftDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function storeTupleNftDestroy(source: NftDestroy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftDestroy(): DictionaryValue<NftDestroy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftDestroy(src)).endCell());
        },
        parse: (src) => {
            return loadNftDestroy(src.loadRef().beginParse());
        }
    }
}

export type NftData = {
    $$type: 'NftData';
    deployed: boolean;
    index: bigint;
    collection: Address;
    owner: Address;
    content: Cell;
}

export function storeNftData(src: NftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.deployed);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadNftData(slice: Slice) {
    let sc_0 = slice;
    let _deployed = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function loadTupleNftData(source: TupleReader) {
    let _deployed = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function storeTupleNftData(source: NftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.deployed);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftData(src)).endCell());
        },
        parse: (src) => {
            return loadNftData(src.loadRef().beginParse());
        }
    }
}

export type NftRoyaltyParams = {
    $$type: 'NftRoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    royalty_destination: Address;
}

export function storeNftRoyaltyParams(src: NftRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.royalty_destination);
    };
}

export function loadNftRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _royalty_destination = sc_0.loadAddress();
    return { $$type: 'NftRoyaltyParams' as const, numerator: _numerator, denominator: _denominator, royalty_destination: _royalty_destination };
}

function loadTupleNftRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _royalty_destination = source.readAddress();
    return { $$type: 'NftRoyaltyParams' as const, numerator: _numerator, denominator: _denominator, royalty_destination: _royalty_destination };
}

function storeTupleNftRoyaltyParams(source: NftRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.royalty_destination);
    return builder.build();
}

function dictValueParserNftRoyaltyParams(): DictionaryValue<NftRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

 type NFTItem_init_args = {
    $$type: 'NFTItem_init_args';
    collection: Address;
    index: bigint;
    content: Cell;
    owner: Address;
    royalty_destination: Address;
    numerator: bigint;
    denominator: bigint;
}

function initNFTItem_init_args(src: NFTItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection);
        b_0.storeInt(src.index, 257);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.owner);
        let b_1 = new Builder();
        b_1.storeAddress(src.royalty_destination);
        b_1.storeInt(src.numerator, 257);
        b_1.storeInt(src.denominator, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function NFTItem_init(collection: Address, index: bigint, content: Cell, owner: Address, royalty_destination: Address, numerator: bigint, denominator: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNFTItem_init_args({ $$type: 'NFTItem_init_args', collection, index, content, owner, royalty_destination, numerator, denominator })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NFTItem_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    21543: { message: `Only owner can burn` },
    36952: { message: `Only owner can transfer` },
    50014: { message: `Only owner can init` },
    54615: { message: `Insufficient balance` },
    56102: { message: `Not deployed` },
}

const NFTItem_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftTransfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"NftExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftGetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftOwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"NftReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftGetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftDestroy","header":520377210,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftData","header":null,"fields":[{"name":"deployed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"NftRoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"royalty_destination","type":{"kind":"simple","type":"address","optional":false}}]},
]

const NFTItem_getters: ABIGetter[] = [
    {"name":"get_nft_data","arguments":[],"returnType":{"kind":"simple","type":"NftData","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"royalty_params","arguments":[],"returnType":{"kind":"simple","type":"NftRoyaltyParams","optional":false}},
]

const NFTItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"NftDestroy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NftTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NftGetStaticData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NftGetRoyaltyParams"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class NFTItem implements Contract {
    
    static async init(collection: Address, index: bigint, content: Cell, owner: Address, royalty_destination: Address, numerator: bigint, denominator: bigint) {
        return await NFTItem_init(collection, index, content, owner, royalty_destination, numerator, denominator);
    }
    
    static async fromInit(collection: Address, index: bigint, content: Cell, owner: Address, royalty_destination: Address, numerator: bigint, denominator: bigint) {
        const init = await NFTItem_init(collection, index, content, owner, royalty_destination, numerator, denominator);
        const address = contractAddress(0, init);
        return new NFTItem(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NFTItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NFTItem_types,
        getters: NFTItem_getters,
        receivers: NFTItem_receivers,
        errors: NFTItem_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: NftDestroy | NftTransfer | NftGetStaticData | NftGetRoyaltyParams | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftDestroy') {
            body = beginCell().store(storeNftDestroy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftTransfer') {
            body = beginCell().store(storeNftTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftGetStaticData') {
            body = beginCell().store(storeNftGetStaticData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftGetRoyaltyParams') {
            body = beginCell().store(storeNftGetRoyaltyParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetNftData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_nft_data', builder.build())).stack;
        const result = loadTupleNftData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleNftRoyaltyParams(source);
        return result;
    }
    
}