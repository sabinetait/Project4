import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, remove} from 'firebase/database';
import './RealtimeDb.css'; 
import AddNotes from '../components/AddNotes.js';

//Function for firebase one city node on trips list route. 
const RealtimeDb = (props) => {
  const database = getDatabase(firebase);
  const [productList, setProductList] = useState([]);
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
            setProductList([]);
          } else {
            setProductList(response.val());
          }
        },
        []
      );
    }, [UserCitySelected, database]);
  
  //Conditional render map for firebase city node restaurants
  const renderMap = () => {
    if (
      productList === null ||
      productList === undefined ||
      productList === "" ||
      productList.length === 0
    );
    else {
      return (
        <ul className="DataBaseResultsList">
          {/* Maps over node and renders one city object with children */}
          {Object.keys(productList).map((key, index) => (
            <li id={`${key}`} key={index}>
              <h3>{productList[`${key}`].name}</h3>
              <img
                src={productList[`${key}`].image}
                alt={productList[`${key}`].name}
              />
              <p>Notes: {productList[`${key}`].message}</p>
              <div className="databaseButtonContainer">
                <AddNotes restaurantName={productList[`${key}`].name} cityName={UserCitySelected} restImage={productList[`${key}`].image}/>
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