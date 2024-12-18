import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Web3ProviderWrapper from "~/components/Web3Provider";
import WalletConnect from "~/components/WalletConnect";

export const loader = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    );
    const prices = await response.json();

    // Fetch trending coins
    const trendingResponse = await fetch(
      'https://api.coingecko.com/api/v3/search/trending'
    );
    const trending = await trendingResponse.json();

    return json({
      prices,
      trending,
      error: null
    });
  } catch (error) {
    return json({
      prices: {
        bitcoin: { usd: 0 },
        ethereum: { usd: 0 }
      },
      trending: { coins: [] },
      error: 'Failed to fetch data'
    });
  }
};

export default function Index() {
  const { prices, trending, error } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Crypto Portfolio Tracker
          </h1>
          <p className="mt-2 text-gray-600">
            Track your crypto assets and market prices in real-time
          </p>
        </div>

        {/* Wallet Section */}
        <Web3ProviderWrapper>
          <WalletConnect />
        </Web3ProviderWrapper>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <img
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                  alt="Bitcoin"
                  className="w-8 h-8 mr-3"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Bitcoin (BTC)</h2>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ${prices.bitcoin.usd.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                  alt="Ethereum"
                  className="w-8 h-8 mr-3"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Ethereum (ETH)</h2>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ${prices.ethereum.usd.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Coins */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Trending Coins
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trending.coins?.map((coin: any) => (
              <div key={coin.item.id} className="border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={coin.item.small}
                    alt={coin.item.name}
                    className="w-8 h-8"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{coin.item.name}</h3>
                    <p className="text-sm text-gray-500">{coin.item.symbol}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Rank #{coin.item.market_cap_rank}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}