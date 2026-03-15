import "../style/loading.css";

export const LoadingSpinner = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading data...</p>
    </div>
  );
};
