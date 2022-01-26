import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, remove} from 'firebase/database';
import './RealtimeDb.css'; 

const RealtimeDb = (props) => {
  const database = getDatabase(firebase);
  const [productList, setProductList] = useState([]);
  const [fire, setFire] = useState("");
//   const [userInput, setUserInput] = useState("");
  const [prompt, setPrompt] = useState(false);

  let UserCitySelected = props.buttonClicked;

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
  }, [database, UserCitySelected]);

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
          {Object.keys(productList).map((key, index) => (
            <li id={`${key}`} key={index}>
              <h3>{productList[`${key}`].name}</h3>
              <img
                src={productList[`${key}`].image}
                alt={productList[`${key}`].name}
              />
              <button
                value={`${key}`}
                onClick={(event) => {
                  setFire(`${event.target.value}`);
                  handleRemoveTrip();
                }}
              >
                Click to Remove
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  const handleRemoveTrip = () => {
    setPrompt(true);
  };

//   const handleInputChange = (event) => {
//     setUserInput(event.target.value);
//   };

  const handleRemoveRestaurant = () => {
    const databaseReference = ref(database, `City/${UserCitySelected}/Restaurant/${fire}`);
    remove(databaseReference);
    setPrompt(false);
  };

  return (
    <>
        <div className="dataBaseWrapper">
            <div className='titleContainer'>
              <h2>My Stops in {UserCitySelected}!</h2>
            </div>
        {renderMap()}

        <div className={`prompt${prompt ? " opened" : " closed"}`}>
          <p>Are you sure you want to remove this restaurant?</p>
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
    </>
  );
};
export default RealtimeDb;


//Important DO NOT DELETE IN ANY CIRCUMSTANCES NECESSARY FOR A COMPONENT THAT MAY BE NEEDED TO BE CREATED .........................


//{Object.keys(productList).map((key) => (
  //  <>
    // <p key={key}>{productList[`${key}`]}</p>
       // <button onClick={() => { handleRemoveTrip(); setFire(key) }}>Click to Remove</button>
    // </>
//))}