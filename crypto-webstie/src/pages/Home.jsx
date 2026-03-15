import { fetchCoins } from "../api/coinGecko";
import { useEffect, useState } from "react";
import "../style/loading.css";
import "../style/home.css";
import { CryptoCard } from "../components/CryptoCard";

function Home() {
  const [CryptoList, setCryptoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCoins();
      setCryptoList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <div className="app">
      <div className="controls">
        <div className="filter-group"></div>
        <div className="view-toggle">
          <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>
            Grid
          </button>
          <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>
            List
          </button>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {CryptoList.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
