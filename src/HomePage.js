import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="wrapper-HomePage">
      <div className="HomePageContainer">
        <h1>Bite-Size Traveling</h1>
        <div className="HomePageButtonsContainer">
          <Link to="/TripsList"><button className="HompageTripButton">
            Modify/Go to an Existing Trip</button>
            </Link>
          <Link to="/restaurant-search">
            <button className="HompageTripButton">Create a Trip</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
