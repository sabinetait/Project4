import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="upperNav">
            <div className="wrapper-Nav">
                <ul>
                    <li> <Link to="/">Home</Link></li>
                    <li> <Link to="/TripsList">My Trips</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;