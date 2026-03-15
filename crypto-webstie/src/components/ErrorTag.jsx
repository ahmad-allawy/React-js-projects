import "../style/errorTag.css";

export const ErrorTag = ({ message }) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};
