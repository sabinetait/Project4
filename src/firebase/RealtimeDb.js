import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, remove} from 'firebase/database';
import AddNotes from '../components/AddNotes.js';

//Function for firebase one city node on trips list route. 
const RealtimeDb = (props) => {
  const database = getDatabase(firebase);
  const [restaurantList, setRestaurantList] = useState([]);
  const [singleRestaurant, setSingleRestaurant] = useState("");
  const [prompt, setPrompt] = useState(false);

  let UserCitySelected = props.buttonClicked;
  
  //Firebase use effect ********************************************RYAN PLZ REMEMBER TO CHANGE PRODUCTLIST TO RESTAURANT LIST EVERYWHERE **************************************************
  useEffect(() => {
      
    const dbRootAddress = ref(database, `City/${UserCitySelected}/Restaurant/`);
      onValue(
        dbRootAddress,
        (response) => {
          if (response.val() === null) {
            setRestaurantList([]);
          } else {
            setRestaurantList(response.val());
          }
        },
        []
      );
    }, [UserCitySelected, database]);
  
  //Conditional render map for firebase city node restaurants
  const renderMap = () => {
    if (
      restaurantList === null ||
      restaurantList === undefined ||
      restaurantList === "" ||
      restaurantList.length === 0
    ) {
      return (
        <h2 className='TripsActivitiesNull'>Trips List is Empty, Add Some Activities!</h2>
      )
    }
    else {
      return (
        <ul className="dataBaseResultsList">
          {/* Maps over node and renders one city object with children */}
          {Object.keys(restaurantList).map((key, index) => (
            <li id={`${key}`} key={index}>
              <h3>{restaurantList[`${key}`].name}</h3>
              <img
                src={restaurantList[`${key}`].image}
                alt={restaurantList[`${key}`].name}
              />
              <p>Notes: {restaurantList[`${key}`].message}</p>
              <div className="databaseButtonContainer">
                <AddNotes restaurantName={restaurantList[`${key}`].name} cityName={UserCitySelected} restImage={restaurantList[`${key}`].image}/>
                <button
                  value={`${key}`}
                  onClick={(event) => {
                    setSingleRestaurant(`${event.target.value}`);
                    handleRemoveTrip();
                  }}
                >
                  Remove Restaurant
                </button>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  };

  const handleRemoveTrip = () => {
    setPrompt(true);
  };

  //Handles remove restaurant 
  const handleRemoveRestaurant = () => {

    
      const databaseReference = ref(database, `City/${UserCitySelected}/Restaurant/${singleRestaurant}`);
      remove(databaseReference);
      setPrompt(false);
    
    if (
      restaurantList === null ||
      restaurantList === undefined ||
      restaurantList === "" ||
      restaurantList.length === 0
    ) { 

      const databaseReference = ref(database, `City/${UserCitySelected}/`);
      remove(databaseReference);
      setPrompt(false);

    }
  };

  return (
    <section className='firebaseNodeOneSection'>
      <div className="dataBaseWrapper">
        <div className='titleContainer'>
              <h2>My Stops in {UserCitySelected}!</h2>
            </div>
        {renderMap()}

        {/* Prompt to remove restaurant */}
        <div className={`prompt${prompt ? " opened" : " closed"}`}>
          <p>Are you sure you want to remove this restaurant?</p>
          <div className="promptButtonContainer">
             <button
            onClick={() => {
              handleRemoveRestaurant();
            }}
          >
            Yes, remove
          </button>
          <button onClick={() => setPrompt(false)}>No, go back</button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RealtimeDb;