import { useWeb3React } from '@web3-react/core';
import { injected } from '~/utils/web3.client'; // Ubah ini dari web3.server menjadi web3.client
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect() {
  const { active, account, activate, deactivate, library } = useWeb3React();
  const [balance, setBalance] = useState<string>('');
  const [portfolioValue, setPortfolioValue] = useState<number>(0);

  useEffect(() => {
    async function getBalance() {
      if (library && account) {
        try {
          const balance = await library.getBalance(account);
          const ethBalance = ethers.utils.formatEther(balance);
          setBalance(ethBalance);
          setPortfolioValue(parseFloat(ethBalance) * 2000);
        } catch (err) {
          console.error('Error fetching balance:', err);
          setBalance('0');
          setPortfolioValue(0);
        }
      }
    }
    getBalance();
  }, [library, account]);

  async function connect() {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Error connecting:', error);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      setBalance('');
      setPortfolioValue(0);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      {active ? (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Connected Wallet</p>
              <p className="font-mono text-sm">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </p>
            </div>
            <button
              onClick={disconnect}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Disconnect
            </button>
          </div>
          {balance && (
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">ETH Balance:</p>
                <p className="font-semibold">{parseFloat(balance).toFixed(4)} ETH</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-600">Portfolio Value:</p>
                <p className="font-semibold">${portfolioValue.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Connect Your Wallet</h3>
          <button
            onClick={connect}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
}