import './App.css';
import RestaurantSearchPage from './RestaurantSearchPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.js';
import HomePage from './HomePage.js';
import TripsList from './TripsList.js';

import { useState } from 'react';
import RealtimeDb from './RealtimeDb';

function App() {
  let [passedProps, setPassedProps] = useState("");

  const changeState = () => {
    setPassedProps(document.querySelector("#citySelect option:checked").value);
  }

  const getValue = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
      <NavBar />
       <Routes>
          <Route path="/" element={<HomePage passedProps={passedProps} changeState={changeState}/>}/>
          <Route path="/restaurant-search" element={<RestaurantSearchPage passedProps={passedProps} getValue={getValue} />} />
          <Route path="/TripsList" element={<TripsList />} />
          <Route path="/RealTime" element={<RealtimeDb />}/>
       </Routes>
      </header>
    </div>
  );
}

export default App;