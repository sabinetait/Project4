import firebase from './Firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import { useState, useEffect } from 'react';

const FirebaseHandlingData = () => {
    const [ trips, setTrips ] = useState([]);
    const [ userInput, setUserInput ] = useState('');
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    

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
  }, [])

  const handleInputChange = (event) => {
      setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      push(dbRef, userInput);
      setUserInput('');
  }

  const handleRemoveTrip = (tripId) => {
        const databaseReference = ref(database, `/${tripId}`)
        remove(databaseReference)
    }

  return (
      <>
        <ul>
        {
          trips.map((trip) => {
            return (
              <li key={trip.key}>
                  <p>{trip.name} - {trip.key}</p>
                <button onClick={() => handleRemoveTrip(trip.key)}>Remove Trip</button>   
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
      </>
  )
}

export default FirebaseHandlingData