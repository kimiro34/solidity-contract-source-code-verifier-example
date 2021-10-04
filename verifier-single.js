var solc = require("solc");
var fs = require("fs");

//Define parameters for soldity compiler and contract
var solc_version = "v0.5.16+commit.9c3226ce";
var contract_name = "X2";

//Define filepath for input and output
var contract_filename = "./contracts/single/test1/X2.sol";
var blockchain_bytecode_filename =
  "./contracts/single/test1/blockchain-bytecode.txt";
var compiled_bytecode_output_path =
  "./contracts/single/test1/output/compiled_bytecode.txt";
var all_output_path = "./contracts/single/test1/output/all.txt";

var sourceCode = fs.readFileSync(contract_filename, "utf8");
var blockchain_bytecode = fs.readFileSync(blockchain_bytecode_filename, "utf8");

//compile using solc
solc.loadRemoteVersion(solc_version, async function (err, solc_specific) {
  if (!err) {
    var input = {
      language: "Solidity",
      sources: {
        "compiling.sol": {
          content: sourceCode,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["evm.bytecode", "evm.deployedBytecode", "abi"],
          },
        },
      },
    };

    //Get full compiled output
    var output = JSON.parse(
      solc_specific.compile(JSON.stringify(input), null, "\t")
    );
    //write full output on "./contracts/single/test1/output/all.txt"
    fs.writeFileSync(
      all_output_path,
      JSON.stringify(output, null, "\t"),
      "utf8"
    );

    //Get compiled bytecode of smart contract
    var compiled_bytecode =
      "0x" +
      output["contracts"]["compiling.sol"][contract_name].evm.bytecode.object;
    fs.writeFileSync(compiled_bytecode_output_path, compiled_bytecode, "utf8");

    processed_compiled_bytecode = processBytecode(compiled_bytecode);
    processed_blockchain_bytecode = processBytecode(blockchain_bytecode);

    if (processed_blockchain_bytecode == processed_compiled_bytecode) {
      console.log("Verified!");
    } else {
      console.log("Not Verified");
    }
  }
});

function processBytecode(bytecode) {
  // Semantic versioning
  let solc_minor = parseInt(
    solc_version
      .match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0]
      .match(/\.\d+/g)[0]
      .slice(1)
  );
  let solc_patch = parseInt(
    solc_version
      .match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0]
      .match(/\.\d+/g)[1]
      .slice(1)
  );

  if (solc_minor >= 4 && solc_patch >= 22) {
    var starting_point = bytecode.lastIndexOf("6080604052");
    var ending_point = bytecode.search("a165627a7a72305820");
    return bytecode.slice(starting_point, ending_point);
  } else if (solc_minor >= 4 && solc_patch >= 7) {
    var starting_point = bytecode.lastIndexOf("6060604052");
    var ending_point = bytecode.search("a165627a7a72305820");
    return bytecode.slice(starting_point, ending_point);
  } else {
    return bytecode;
  }
}
