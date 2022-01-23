import { Link } from 'react-router-dom';

const NavBar = () => {
    return (

        <nav className="upperNav">
            <ul>
                <li> <Link to="/">Home</Link></li>
                <li> <Link to="/trip-list">My Trips</Link></li>
            </ul>

        </nav>
    )
}

export default NavBar;