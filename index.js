import { ethers } from "./ethers.js";
import { contractAddress, abi } from "./constant.js";
const btn_connect = document.getElementById("btn_connect");
const btn_getdata = document.getElementById("btn_getdata");
const btn_getowner = document.getElementById("btn_getowner");

btn_connect.onclick = connect;
btn_getdata.onclick = getdata;
btn_getowner.onclick = getowner;

async function connect() {
  if (typeof window.ethereum != "undefined") {
    console.log("Connecting to metamask...");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected");
  } else {
    console.log("No metamask!!!");
  }
}

async function getdata() {
  if (typeof window.ethereum != "undefined") {
    console.log("Getting data...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transActionResponse = await contract.getData();
    // await listenForTransactionMine(transActionResponse, provider);
    console.log(transActionResponse)
    console.log("Get data Finished");
  } else {
    console.log("No metamask!!!");
  }
}

async function getowner() {
  if (typeof window.ethereum != "undefined") {
    console.log("Getting owneradderss...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transActionResponse = await contract.getOwner();
    // await listenForTransactionMine(transActionResponse, provider);
    console.log(transActionResponse)

    console.log("Get owner Finished");
  } else {
    console.log("No metamask!!!");
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
