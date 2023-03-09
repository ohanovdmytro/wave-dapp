import React from 'react';
import { ethers } from 'ethers';
import './App.css';
import { useEffect, useState } from 'react';
import abi from './utils/Buildspace.json';

const getEthereumObject = () => window.ethereum;

const findMetamaskAccount = async () => {

  try {

    const ethereum = getEthereumObject();
    if(!ethereum) {
      console.error("Make sure you have MetaMask installed!");
      return null;
    }

    console.log("We got your Ethereum connection!", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if(accounts.length != 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account)
      return account;
    } else {
      console.error("No authorized accounts found!");
      return null;
    }

  } 
  
  catch(err) {
    console.error(err);
    return null;
  }

}

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = '0x0C84D86450f79572B3A0F6b59263c2A47340f5E9';
  const contractABI = abi.abi;

  const connectWallet = async () => {

    try {

      const ethereum = getEthereumObject();
      if (!ethereum) { 
        alert("Your MetaMask is not connected!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

    }

    catch(err) {
      console.error(err);
    }

  }

  useEffect(() => {
    findMetamaskAccount().then((account) => {
      if(account != null) {
        setCurrentAccount(account);
      }
    });
  }, []);

  const wave = async () => {

    try {

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const BuildspaceContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await BuildspaceContract.getTotalWaves();
        console.log("Total wave number is: ", count.toNumber());

        const waveTxn = await BuildspaceContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await BuildspaceContract.getTotalWaves();
        console.log("Total wave number is: ", count.toNumber());
      } else {
        console.error("Ethereum object doesn't exist");
      }

    }

    catch(err) {
      console.error(err);
    }

  }

  return (
    <div className="mainContainer">
      <div className="dataContainer">

        <div className="header">
        👋 Bom dia!
        </div>

        <div className="bio">
        So, now we just gonna connect Ethereum wallet (MetaMask) to this dApp
        </div>

        <button className="waveButton" onClick={wave}>
          Press on me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

      </div>
    </div>
  );
}

export default App;
