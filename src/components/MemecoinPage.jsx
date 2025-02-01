import React, { useState } from 'react';
import Web3 from 'web3';
import './MemecoinPage.css';

function MemecoinPage() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="memecoin-page">
      <h1>Space Pirate Memecoin</h1>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </div>
  );
}

export default MemecoinPage;
