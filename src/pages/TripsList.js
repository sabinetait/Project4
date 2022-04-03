import RealtimeDb from "../firebase/RealtimeDb";
import { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import { getDatabase, onValue, ref, remove } from "firebase/database";

//Function for my saved trips page. 
const TripsList = () => {
  const database = getDatabase(firebase);
  const [productList, setProductList] = useState([]);
  const [databaseRender, setDatabaseRender] = useState(false);
  const [buttonClickedValueSetting, setbuttonClickedValueSetting] = useState("");
  const [city, setCity] = useState("");
  const [removeTripState, setRemoveTripState] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [errorFirebase, setErrorFirebase] = useState(false); 

  //Click handler for saved restaurants for saved trips page. 
  const buttonClickedValue = (event) => {
    setbuttonClickedValueSetting(`${event.target.value}`);
    setDatabaseRender(true);
  };

  //Firebase call useEffect
  useEffect(() => {
    const dbRootAddress = ref(database, "Saved/");

    onValue(
      dbRootAddress,
      (response) => {
        if (response.val() === null) {
          setProductList([]);
          setErrorFirebase(true); 
        } else {
          setProductList(response.val());
        }
      },
      []
    );
  }, [database]);

  //Handles remove trip prompt open
  const handleRemoveTrip = () => {
    setPrompt(true);
  };

  //Handles confirmation for removing trip.
  const handleRemoveTripConfirmation = () => {
    const databaseReference = ref(database, `City/${city}/`);
    const dataSavedCityReference = ref(database, `Saved/${city}/`);
    remove(databaseReference);
    remove(dataSavedCityReference);
    setPrompt(false);
    setCity("");
  };

  //Conditional render map for firebase on my saved trips page
  const renderMenu = () => {
    if (
      productList === null ||
      productList === undefined ||
      productList === "" ||
      productList.length === 0
    );
    else {
      return (
        <div className={`RemoveMenu${removeTripState ? " openRemovedTripMenu" : " closedRemovedTripMenu"}`}>
          {Object.keys(productList).map((key, index) => (
            <button key={index} onClick={(event) => {setCity(event.target.value); handleRemoveTrip();}}value={productList[`${key}`].name}>
            {productList[`${key}`].name}</button>
          ))}
          <button className="removeTripButtonInMenu" onClick={() => setRemoveTripState(false)}>Close Menu</button>
        </div>
      );
    }
  };

  //Conditional renders prompt menu for trip removal
  const renderPromptMenu = () => {
    if (prompt === false);
    else {
      return (
        <div className="promptMenuConfirmation">
          <p>Are you sure you want to remove this trip to {city}?</p>
          
          <div className="promptMenuConfirmationButtonContainer">
          <button
            onClick={() => {
              handleRemoveTripConfirmation();
            }}
          >
            Yes, remove
          </button>
          <button onClick={() => setPrompt(false)}>No, go back</button>
          </div>
        </div>
      );
    }
  };

  const renderFirebaseError = () => { 

    if (errorFirebase === true) {
      return (<p>Nothing to see here, add some trips!</p>)
    }
    else if (errorFirebase === false); 
  }

  //Conditional rendering my trips page, restaurant saved, and using firebase
  const renderDataBase = () => {
    if (databaseRender === false) {
      return (
        <section className="savedTripsSection">
          <div className="savedTrips-Wrappper">
            {renderFirebaseError()}
            <div className="TitleContainer">
              <h2>Your Saved Trips!</h2>
            </div>
            {renderMenu()}
            {renderMap()}
            {renderPromptMenu()}
            <div className="removeTrip">
              <button onClick={() => {setRemoveTripState((removeTripState) => !removeTripState);}}
              className="removeTripButton">Remove Trip</button>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <>
          <RealtimeDb buttonClicked={buttonClickedValueSetting} />
        </>
      );
    }
  };

  //Conditional render map for trip list buttons.
  const renderMap = () => {
    if (
      productList === null ||
      productList === undefined ||
      productList === "" ||
      productList.length === 0
    );
    else {
      return (
        <ul className="FirebaseTripUserSaved">
          {Object.keys(productList).map((key, index) => (
            <li id={`${key}`} key={index}>
              <button onClick={buttonClickedValue} value={productList[`${key}`].name}>
                {productList[`${key}`].name}
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };
  return <>{renderDataBase()}</>;
};

export default TripsList;
