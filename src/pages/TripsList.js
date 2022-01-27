import RealtimeDb from "../firebase/RealtimeDb";
import "./TripList.css";
import { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import { getDatabase, onValue, ref, remove } from "firebase/database";

const TripsList = () => {
  const database = getDatabase(firebase);
  const [productList, setProductList] = useState([]);
  const [databaseRender, setDatabaseRender] = useState(false);
  const [buttonClickedValueSetting, setbuttonClickedValueSetting] = useState("");
const [city, setCity] = useState("");
    const [videoMenu, setVideoMenu] = useState(false); 
  const [removeTripState, setRemoveTripState] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [errorFirebase, setErrorFirebase] = useState(false); 



  const buttonClickedValue = (event) => {
    setbuttonClickedValueSetting(`${event.target.value}`);
    console.log(buttonClickedValueSetting);
    setDatabaseRender(true);
  };

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

  const handleRemoveTrip = () => {
    setPrompt(true);
    console.log(city);
  };

  const handleRemoveTripConfirmation = () => {
    const databaseReference = ref(database, `City/${city}/`);
    const dataSavedCityReference = ref(database, `Saved/${city}/`);
    remove(databaseReference);
    remove(dataSavedCityReference);
    setPrompt(false);
    setCity("");
  };

  const renderMenu = () => {
    if (
      productList === null ||
      productList === undefined ||
      productList === "" ||
      productList.length === 0
    );
    else {
      return (
        <div
          className={`RemoveMenu${
            removeTripState ? " openRemovedTripMenu" : " closedRemovedTripMenu"
          }`}
        >
          {Object.keys(productList).map((key, index) => (
            <button onMouseEnter={clickSoundPlay} onMouseOut={clickSoundPause}
              key={index}
              onClick={(event) => {
                setCity(event.target.value);
                handleRemoveTrip();
              }}
              value={productList[`${key}`].name}
            >
              {productList[`${key}`].name}
            </button>
          ))}
              <button onClick={() => {rickMe();
              }}>The Meaning of Life You Must Click This or Die</button>
        </div>
      );
    }
  };
  const renderPromptMenu = () => {
    if (prompt === false);
    else {
      return (
        <div className="promptMenuConfirmation">
          <p>Are you sure you want to remove this trip to {city}?</p>
          <button
            onClick={() => {
              handleRemoveTripConfirmation();
            }}
          >
            Yes, remove
          </button>
          <button onClick={() => setPrompt(false)}>No, go back</button>
        </div>
      );
    }
  };
  const rickMe = () =>{
 
    let video = document.getElementById('RickMe');
    
    if (videoMenu === true) { 
      video.volume = 1; 
      video.pause(); 
   
    }

    else {
      video.volume = 1; 
      video.play();
    }
      setVideoMenu((videoMenu) => !videoMenu);
 }
 const clickSoundPlay = () => {
    
    let audio = document.getElementById('beep');
    audio.volume = 0.5; 
    audio.play();
    audio.currentTime=0;

  }

  const clickSoundPause = () => {
    let audio = document.getElementById('beep');
    audio.pause();

  }

  const renderFirebaseError = () => { 

    if (errorFirebase === true) {
      

      return (

        <p>Nothing to see here, add some trips!</p>
      )
    }

    else if (errorFirebase === false); 
    
    
  }


  const renderDataBase = () => {
    if (databaseRender === false) {
      return (
        <div className="savedTrips-Wrappper">
          {renderFirebaseError()}
              <video  className={`RickMe${videoMenu ? " show" : " hide"
                  }`} id="RickMe" src="./Assets/video/RickMe.mp4"></video>
              <audio id="beep" src="./Assets/beep.mp3"/>
          <div className="TitleContainer">
            <h2>Your Saved Trips!</h2>
          </div>
          {renderMenu()}
          {renderMap()}
          {renderPromptMenu()}
          <div className="removeTrip">
            <button onMouseEnter={clickSoundPlay} onMouseOut={clickSoundPause}
              onClick={() => {
                setRemoveTripState((removeTripState) => !removeTripState);
              }}
              className="removeTripButton"
            >
              Remove Trip
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <RealtimeDb buttonClicked={buttonClickedValueSetting} />
        </>
      );
    }
  };

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
              <button onMouseEnter={clickSoundPlay} onMouseOut={clickSoundPause}
                onClick={buttonClickedValue}
                value={productList[`${key}`].name}
              >
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
