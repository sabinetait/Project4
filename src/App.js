import './App.css';
import ResturantSearchPage from './ResturantSearchPage';
import { Routes, Route } from 'react-router-dom';

import NavBar from './NavBar.js';
import HomePage from './HomePage.js';

function App() {
  
  return (
    <div className="App">
      <NavBar />

      <header className="App-header">
       
       <Routes>
          <Route path="/" element={ <HomePage/>}/>
          <Route path="/restaurant-search" element={<ResturantSearchPage/> }/>
       </Routes>
      </header>
    </div>
  );
}

export default App;
