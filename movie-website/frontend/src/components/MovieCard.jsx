import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie}) {
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

    const favorite = isFavorite(movie.id);

    function onFavoriteClicked(e){
        e.preventDefault();
        if(favorite){
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                   <button className={`favorite-btn ${favorite ? "favorited" : ""}`} onClick={onFavoriteClicked}></button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    )
}

export default MovieCard;