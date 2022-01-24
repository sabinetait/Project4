import firebase from './Firebase';
import { getDatabase, ref, onValue, push, remove, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const FirebaseHandlingData = () => {

  const database = getDatabase(firebase);
  const dbRef = ref(database);
  
  const [ trips, setTrips ] = useState([]);
  const [ userInput, setUserInput ] = useState('');
  const [Prompt, setPrompt] = useState(false); 
  const [Fire, setFire] = useState(''); 
    
  useEffect(() => {
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({key: key, name: data[key]});
      }
      setTrips(newState);
      console.log(response.val());
    })
  }, [dbRef]);

  const handleInputChange = (event) => {
      setUserInput(event.target.value);
  };

  const writeUserData = () => {
    let Rest = ["hi", 'bye'];
    const db = getDatabase();
    set(ref(db, 'city/'), {
      Rest
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (userInput.length > 3) {
      push(dbRef, userInput);
      setUserInput('');
    }

    else { 
      alert("needs to be Longer");
    }
  };

  const handleRemoveTrip = () => {
    const databaseReference = ref(database, `/${Fire}`)
    remove(databaseReference);
    setPrompt(false)
    setFire('');
  };

  const renderId = () => {
    if (trips.id === null || trips.id === "" || trips.id === undefined || trips.id.length === 0);
   else {
     return (
       <div></div>
     )
   }
  }

  const renderTrips = () => {
    if (trips === null || trips === "" || trips === undefined || trips.length === 0);
  else {
    return (
      <div>
        <ul>
          {[trips].map((trip) => {
            // {renderId()} 
            return (
              <li key={trip.key}>
                <p>{trip.name}</p>
                <button onClick={() => { setPrompt(true); setFire(trip.key) }}>Click to Remove</button>
              </li>
            );
          })}
        </ul>
  
      </div>
    )
  }
  }
  
  return (
    <>
      <div className="wrapper">
        {renderTrips()}
        <form action="submit">
            <label htmlFor="newTrip" aria-label="Add new trip"></label>
            <input placeholder="Add a new trip" type="text" id="newTrip" value={userInput} onChange={handleInputChange} />
            <button onClick={handleSubmit}>Add a trip</button>
        </form>
          
        <div className={`PromptMenu${Prompt ? " opened" : " closed"}`}>
          <button onClick={() => setPrompt(false)}>Go Back</button>
          <button onClick={() => { handleRemoveTrip()}}>Remove Trip</button>
        </div>
        
      </div>
    </>
  )
}

export default FirebaseHandlingData;