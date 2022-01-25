import './App.css';
import RestaurantSearchPage from './RestaurantSearchPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.js';
import HomePage from './HomePage.js';
// import FirebaseHandlingData from './FirebaseHandlingData';
import RealtimeDb from './RealtimeDb';
import { useState } from 'react/cjs/react.development';

function App() {
  let [passedProps, setPassedProps] = useState("");
  console.log(passedProps);

  const changeState = () => {
    let setPassedProps = document.querySelector("#citySelect option:checked").value;
    console.log(setPassedProps);
  }

  const getValue = () => {
    console.log(setPassedProps);
  }

  return (
    <div className="App">
      <header className="App-header">
      <NavBar />
       <Routes>
          <Route path="/" element={<HomePage passedProps={passedProps} changeState={changeState}/>}/>
          <Route path="/restaurant-search" element={<RestaurantSearchPage passedProps={passedProps} getValue={getValue} />} />
          <Route path="/trip-list" element={<RealtimeDb />}/>
       </Routes>
      </header>
    </div>
  );
}

export default App;

// Issue with passing props into our other pages