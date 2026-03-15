import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchCoinDetail, fetchChartData } from "../api/coinGecko";
import { ErrorTag } from "../components/errorTag";
import { LoadingSpinner } from "../components/loadingSpinner";
import { formatMarketCap, formatprice } from "../utils/formatter";
import "../style/coinDetails.css";


import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [chartData, setchartData] = useState([]);

  const loadCoinDetail = async ({ coinId }) => {
    try {
      const data = await fetchCoinDetail(coinId);
      setCoin(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setLoading(false);
      setError("Failed to load coin data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoinDetail({ coinId: id });
  }, [id]);

  const loadChartData = async ({ coinId }) => {
    try {
      const data = await fetchChartData(coinId);
      const formattedData = data.prices.map((price) => ({
        time: new Date(price[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: Number(price[1].toFixed(2)),
      }));
      setchartData(formattedData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setLoading(false);
      setError("Failed to load chart data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChartData({ coinId: id });
  }, [id]);

  const priceChange = coin?.market_data?.price_change_percentage_24h ?? 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            🚀
            <h1>Crypto Tracker</h1>
          </div>
          <button onClick={() => navigate("/")} className="back-button">
            ← back to List
          </button>
        </div>
      </header>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorTag message={error} />}
      {coin && (
        <div className="coin-detail">
          <div className="coin-header">
            <div className="coin-title">
              <img src={coin.image.large} alt={coin.name} />
              <div>
                <h1>{coin.name}</h1>
                <p className="symbol">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            <span className="rank">
              Rank #{coin.market_data.market_cap_rank}
            </span>
          </div>

          <div className="coin-price-section">
            <div className="current-price">
              <h2 className="current-price">
                $ {formatprice(coin.market_data.current_price.usd)}
              </h2>
              <span
                className={`change-badge ${isPositive ? "positive" : "negative"}`}
              >
                {isPositive ? "▲" : "▼"}
                {Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>

            <div className="price-ranges">
              <div className="price-range">
                <span className="range-label">24h High</span>
                <span className="range-value">
                  ${formatprice(coin.market_data.high_24h.usd)}
                </span>
              </div>
              <div className="price-range">
                <span className="range-label">24h Low</span>
                <span className="range-value">
                  ${formatprice(coin.market_data.low_24h.usd)}
                </span>
              </div>
            </div>
          </div>
          <div className="chart-section">
            <h3>Price Chart (7 Days)</h3>
            <ResponsiveContainer width="100%" height="400">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                ></CartesianGrid>
                <XAxis
                  dataKey="time"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(20,20,40,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#e0e0e0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#ADD8E6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">
                {formatMarketCap(coin?.market_data?.market_cap?.usd)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">
                {formatMarketCap(coin?.market_data?.total_volume?.usd)}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Circulating Supply</span>
              <span className="stat-value">
                {coin?.market_data?.circulating_supply?.toLocaleString()}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Supply</span>
              <span className="stat-value">
                {coin?.market_data?.total_supply?.toLocaleString() || "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoinDetail;
