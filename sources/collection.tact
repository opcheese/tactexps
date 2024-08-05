import "@stdlib/deploy";
import "@stdlib/ownable";
import "./item";

struct NftCollectionData {
    next_index: Int;
    content: Cell;
    owner: Address;

}   

contract NftCollection with Deployable, Ownable, NftRoyalty {
    
    owner: Address;
    next_index: Int as uint256 = 0;
    content: Cell;
    royalty_destination: Address;
    numerator: Int as uint16;
    denominator: Int as uint16;

    init(owner: Address,  content: Cell, royalty_destination: Address, numerator: Int, denominator: Int) {
        self.owner = owner;        
        self.content = content;
        self.royalty_destination = royalty_destination;
        self.numerator = numerator;
        self.denominator = denominator;
    }

    receive(msg: RequestNftDeploy) {
        self.requireOwner();
        require(msg.index<=self.next_index , "Wrong index");
        
        let nft_init = initOf NftItem(myAddress(), msg.index);
        let nft_address = contractAddress(nft_init);
        send(SendParameters{
            to: nft_address ,
            value: msg.amount,
            mode: SendPayGasSeparately,
            bounce: false,
            data: nft_init.data,
            code: nft_init.code, 
            body: NftDeploy {
                index: msg.index,
                owner: msg.owner,
                content: msg.content,
                royalty_destination: self.royalty_destination,
                numerator: self.numerator,
                denominator: self.denominator
            }.toCell()
        });  
        if (msg.index == self.next_index) {
            self.next_index = self.next_index + 1;
        }
    }

    get fun get_collection_data(): NftCollectionData {
        return NftCollectionData{
            next_index: self.next_index,
            content: self.content,         
            owner: self.owner,
        };
    }

    get fun get_nft_address_by_index(index: Int): Address {
        return contractAddress(initOf NftItem(myAddress(), index));
    }

    get fun get_nft_content(index: Int, individual_content: Cell): Cell {
        return individual_content;
    }  
}
