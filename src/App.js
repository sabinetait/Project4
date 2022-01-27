import './App.css';
import RestaurantSearchPage from './pages/RestaurantSearchPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.js';
import HomePage from './pages/HomePage.js';
import TripsList from './pages/TripsList.js';
import { useState } from 'react';
import RealtimeDb from './firebase/RealtimeDb';
import Footer from './components/Footer'

function App() {
  
  let [creditsColour, setCreditsColour] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
      <NavBar />
       <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/restaurant-search" element={<RestaurantSearchPage creditsColour={setCreditsColour}/>} />
          <Route path="/TripsList" element={<TripsList />} />
          <Route path="/RealTime" element={<RealtimeDb />}/>
       </Routes>
      </header>
      <Footer creditsColour={creditsColour}/>
    </div>
  );
}

export default App;