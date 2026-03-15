import { fetchCoins } from "../api/coinGecko";
import { useEffect, useState } from "react";
import "../style/home.css";
import "../style/header.css";
import { CryptoCard } from "../components/CryptoCard";
import { ErrorTag } from "../components/errorTag";
import { LoadingSpinner } from "../components/loadingSpinner";

function Home() {
  const [CryptoList, setCryptoList] = useState([]);
  const [filteredCryptoList, setFilteredCryptoList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Rank");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCoins();
      setCryptoList(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
      setError("Failed to load cryptocurrency data. Please try again later.");
    } finally {
      setLoading(false);
     
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const sortCryptoList = (list, option, sQuery) => {
    const sortedList = [...list].filter((crypto) =>
      crypto.name.toLowerCase().includes(sQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(sQuery.toLowerCase())
    );
    switch (option) {
      case "Rank":
        sortedList.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
        break;
      case "name":
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price":
        sortedList.sort((a, b) => a.current_price - b.current_price);
        break;
      case "price-desc":
        sortedList.sort((a, b) => b.current_price - a.current_price);
        break;
      case "change":
        sortedList.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h,
        );
        break;
      case "change-desc":
        sortedList.sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h,
        );
        break;
      case "market_cap":
        sortedList.sort((a, b) => a.market_cap - b.market_cap);
        break;
      case "market_cap_desc":
        sortedList.sort((a, b) => b.market_cap - a.market_cap);
        break;
      default:
        break;
    }
    return sortedList;
  };

  useEffect(() => {
    setFilteredCryptoList(sortCryptoList(CryptoList, sortOption, searchQuery));
  }, [CryptoList, sortOption, searchQuery]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            🚀
            <h1>Crypto Tracker</h1>
          </div>
          <p>Real-time cryptocurrency prices and market data</p>
        </div>
        <div className="search-section">
          <input
          className="search-input"
            type="text"
            placeholder="Search cryptocurrencies..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
      </header>

      <div className="controls">
        <div className="filter-group">
          <label>Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Rank"> {sortOption === "Rank" ? "✔ Rank" : "Rank"}</option>
            <option value="name"> {sortOption === "name" ? "✔ Name" : "Name"}</option>
            <option value="price-desc"> {sortOption === "price-desc" ? "✔ Price ▲" : "Price ▲"}</option>
            <option value="price"> {sortOption === "price" ? "✔ Price ▼" : "Price ▼"}</option>
            <option value="change"> {sortOption === "change" ? "✔ 24h Change" : "24h Change"}</option>
            <option value="change-desc"> {sortOption === "change-desc" ? "✔ 24h Change (Descending)" : "24h Change (Descending)"}</option>
            <option value="market_cap_desc"> {sortOption === "market_cap_desc" ? "✔ Market Cap ▲" : "Market Cap ▲"} </option>
            <option value="market_cap"> {sortOption === "market_cap" ? "✔ Market Cap ▼" : "Market Cap ▼"}</option>
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      
      {error && (
        ErrorTag({ message: error })
      )}
      

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {filteredCryptoList.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
