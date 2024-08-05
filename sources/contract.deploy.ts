import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { NftCollection } from "./output/nft_NftCollection";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { createOffchainContent } from "./helpers";

(async () => {
    // Parameters
    let testnet = true;
    let packageName = "nft_NftCollection.pkg";
    let owner = Address.parse("0QCNGf2fxCJx7sFH83JUayIFh9Y5a9KG8rG-6wDV1r1gW_ij"); //kQAJZdY7CZgzeH-G_6hFoU6qyLOVNLbHCfRUGUJOBbE8qaIS 
    //let owner = Address.parse("EQAJZdY7CZgzeH-G_6hFoU6qyLOVNLbHCfRUGUJOBbE8qRmY"); //kQDMIqppCpbXwBYg1ngXHzrt2L3_pcYSxbycl-zYJE-5uijZ
    let content = createOffchainContent("https://raw.githubusercontent.com/opcheese/tactexps/main/collection.json");
    let init = await NftCollection.init(owner, content, owner, 11n, 1000n); //EQCXnq1SWEa-poYLriArmVN79tFspQ2bw1AZbar1Uxs6Gxsz

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
