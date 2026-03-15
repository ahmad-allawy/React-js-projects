const BASE_URI = "https://api.coingecko.com/api/v3";

export const fetchCoins = async () => {
  const response = await fetch(
    `${BASE_URI}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }

  const data = await response.json();
  return data;
};

export const fetchCoinDetail = async (id) => {
  const response = await fetch(
    `${BASE_URI}/coins/${id}?localization=false&tickers=false&market_data=true&developer_data=false&sparkline=false`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coin detail");
  }
  const data = await response.json();
  return data;
};


export const fetchChartData = async (id) => {
  const response = await fetch(
    `${BASE_URI}/coins/${id}/market_chart?vs_currency=usd&days=7`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coin chart data");
  }
  const data = await response.json();
  return data;
};
