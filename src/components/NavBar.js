import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="upperNav">
            <div className="wrapper-Nav">
                <ul>
                    <li> <Link to="/TripsList">My Trips</Link></li>
                </ul>
                <Link to="/"><i className="fas fa-cookie-bite"> <span className="title">Bite-Sized Traveling</span></i></Link>
            </div>
        </nav>
    );
};

export default NavBar;