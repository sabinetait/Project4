import './App.css';
import RestaurantSearchPage from './RestaurantSearchPage';
import { Routes, Route } from 'react-router-dom';
import firebase from './Firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

import NavBar from './NavBar.js';
import HomePage from './HomePage.js';
import { useState, useEffect } from 'react';

function App() {

  const [ books, setBooks ] = useState([]);
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push(data[key]);
      }
      setBooks(newState);
      console.log(response.val());
    })
  }, [])
  
  return (
    <div className="App">
      <NavBar />
      <ul>
        {
          books.map((book) => {
            return (
              <li><p>{book}</p></li>
            )
          })
        }
      </ul>

      <header className="App-header">
       
       <Routes>
          <Route path="/" element={ <HomePage/>}/>
          <Route path="/restaurant-search" element={<RestaurantSearchPage/> }/>
       </Routes>
      </header>
    </div>
  );
}

export default App;
