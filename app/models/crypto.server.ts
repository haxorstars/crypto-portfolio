const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function getTokenPrices(ids: string[]) {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${ids.join(',')}&vs_currencies=usd`
    );
    if (!response.ok) throw new Error('Failed to fetch prices');
    return response.json();
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return {};
  }
}

export async function getTrendingTokens() {
  try {
    const response = await fetch(`${COINGECKO_API}/search/trending`);
    if (!response.ok) throw new Error('Failed to fetch trending tokens');
    return response.json();
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    return { coins: [] };
  }
}