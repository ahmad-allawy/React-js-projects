import { Link } from "react-router-dom";


function NavBar(){
    return <div className="navebar">
        <div className="navbar-container">
            <div className="navebar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links" >
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </div>
    </div>
}

export default NavBar;