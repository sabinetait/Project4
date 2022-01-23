import './App.css';
import RestaurantSearchPage from './RestaurantSearchPage';
import { Routes, Route } from 'react-router-dom';
import TripsList from './TripsList';


import NavBar from './NavBar.js';
import HomePage from './HomePage.js';

function App() {

 
  
  return (
    <div className="App">
      <NavBar />
      <TripsList />

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
