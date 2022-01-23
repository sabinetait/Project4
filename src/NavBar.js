import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="upperNav">
            <div className="wrapper">
                <ul>
                    <li> <Link to="/">Home</Link></li>
                    <li> <Link to="/trip-list">My Trips</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;