import firebase from './Firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import { useState, useEffect } from 'react';

const FirebaseHandlingData = () => {
    const [ trips, setTrips ] = useState([]);
    const [ userInput, setUserInput ] = useState('');
    const database = getDatabase(firebase);
    const dbRef = ref(database);
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
  }, [dbRef])

  const handleInputChange = (event) => {
      setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      
    
    if (userInput.length > 3) {
      push(dbRef, userInput);
      setUserInput('');
    }

    else { 

      alert("needs to be Longer")
    }
  }

  const handleRemoveTrip = () => {

      const databaseReference = ref(database, `/${Fire}`)
      remove(databaseReference);
      setPrompt(false)
      setFire('');
  }
  
  return (
      <>
        <ul>
        {
          trips.map((trip) => {
            return (
              <li key={trip.key}>
                <p>{trip.name}</p>
                <button onClick={() => { setPrompt(true); setFire(trip.key)}}>Click to Remove</button>  
              </li>
            )
            
          })
        }
      </ul>

        <form action="submit">
          <label htmlFor="newTrip" aria-label="Add new trip"></label>
          <input placeholder="Add a new trip" type="text" id="newTrip" value={userInput} onChange={handleInputChange} />
          <button onClick={handleSubmit}>Add a trip</button>
      </form>
      
      <div className={`PromptMenu${Prompt ? " opened" : " closed"}`}>
        <button onClick={() => setPrompt(false)}>Go Back</button>
        <button onClick={() => { handleRemoveTrip()}}>Remove Trip</button>
      </div>
      </>
  )
}

export default FirebaseHandlingData