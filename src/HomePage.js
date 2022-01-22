import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
        <div>
            <h1>Bite-Size Travelling</h1>

            <div>
                <Link to="/restaurant-search"><button>Create a new trip</button></Link>
                <button>Choose an existing trip</button>
            </div>
        </div>
    )
}

export default HomePage;