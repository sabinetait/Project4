import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="wrapper-HomePage">
      <div className="HomePageContainer">
        <div className="HomePageTitleContainer">
           <h1>Bite-Sized Traveling</h1>
        </div>
        <div className="HomePageButtonsContainer">
          <Link to="/restaurant-search">
            <button className="HompageTripButton">Create a Trip</button>
          </Link>
          <Link to="/TripsList"><button className="HomepageTripButton">
            Modify a Trip</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
