import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="upperNav">
            <div className="wrapper-Nav">
                <ul>
                    <li><Link to="/TripsList">My Trips</Link></li>
                </ul>
                <Link to="/" aria-label="Go to home page">
                    <span className="cookieI"><i className="fas fa-cookie-bite">
                    <span className="title">Bite-Sized Traveling</span></i></span>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;