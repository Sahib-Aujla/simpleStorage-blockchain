const ethers = require("ethers");
const fs = require("fs-extra");
const main = async () => {
  const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  const wallet = new ethers.Wallet(
    "0x5269dae71e8f14e036949d69add9785a370aa08843d3ca0a4df71c0e1411225a",
    provider
  );
  const abi = fs.readFileSync("./simpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./simpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  //console.log(contract);
  //await contract.deployTransaction.wait(1);

  //   const currentFavorite = await contract.retrieve();
  //   console.log(currentFavorite.toString());
  //   const transactionResponse = await contract.store("8");
  //   //const transactionReciept = await transactionResponse.wait(1);
  //   const updatedFavoriteNum = await contract.retrieve();
  //   console.log(updatedFavoriteNum.toString());

  let currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber}`);
  console.log("Updating favorite number...");
  let transactionResponse = await contract.store(7);
  let transactionReceipt = await transactionResponse.wait();
  currentFavoriteNumber = await contract.retrieve();
  console.log(`New Favorite Number: ${currentFavoriteNumber}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
