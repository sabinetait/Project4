import './App.css';
import RestaurantSearchPage from './pages/RestaurantSearchPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.js';
import HomePage from './pages/HomePage.js';
import TripsList from './pages/TripsList.js';
import RealtimeDb from './firebase/RealtimeDb';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <NavBar />
       <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/restaurant-search" element={<RestaurantSearchPage />} />
          <Route path="/TripsList" element={<TripsList />} />
          <Route path="/RealTime" element={<RealtimeDb />}/>
       </Routes>
      <Footer />
    </div>
  );
}

export default App;