import { Link } from 'react-router-dom';

const NavBar = () => {
    return (

        
        <nav>

            <div>Logo</div>


            <ul>
                <li> <Link to="/">Home</Link></li>
                <li> <Link to="/">My Trips</Link></li>
            </ul>

        </nav>
    )
}

export default NavBar;