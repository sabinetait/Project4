import React, { useState } from "react";
import LoadingAnimation from '../components/LoadingAnimation.js';
import './SearchPage.css'
import RestaurantItemsMap from "../components/RestaurantItemsMap.js";

//Funtion that contains yelp api call and renders info on the page. 
function RestaurantSearchPage() {
  const [RestaurantItem, setRestaurantItem] = useState([]);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  const YELPAPICall = () => {
    
      const proxiedUrl = 'https://api.yelp.com/v3/businesses/search';
      const url = new URL('https://proxy.hackeryou.com');
  
    url.search = new URLSearchParams({
      reqUrl: proxiedUrl,
      'params[term]': 'Restuarant',
      'params[location]': `${userInput}`,
      'proxyHeaders[Authorization]': 'Bearer SH6cIaiOu4yFDQ9M6w-8GGkgwaEdtzV1HmQ461hIForr3PDqa-_AwLRfvIkPqrDYKuSvAh9YRLkMSf2BsVEswIWTOGDwrnzM18PA8DEr6elO4j3eBDNqZGixXUbrYXYx',
    });
    
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(data => {
        setRestaurantItem(data.businesses);
      }).catch((err) => {
        //Api error handling. 
        if (err.message === "Not Found") {
          alert("Something went wrong.");
        } else {
          alert("Please try again.");
        }
      })
  }
    
  const RenderAPICall = () => {
    //Conditional rendering of api call.
    if (RestaurantItem === null || RestaurantItem === ' ' || RestaurantItem === undefined || RestaurantItem.length === 0);
    
    else {
    
      return (
        <>
          {/* Loading animation based boolean setState */}
          <div className={`Loading${loadingAnimation ? " show" : " hide"}`}>
            <LoadingAnimation/>
          </div>
          <div className="APIItemsContainer">
            <ul className='RestaurantItems'>
              <RestaurantItemsMap RestaurantItemsMap={RestaurantItem} userInput={userInput}/>
            </ul>
          </div>
        </>
      );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  
  const handleInputChange = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
    const endAnimation = () => {
      setLoadingAnimation(false);
    };
    setLoadingAnimation(true);
    setTimeout(endAnimation, 4000);
  };
  
  //Conditional redndering of animation. 
  const renderLoadingAnimation = () => {
  
    if (LoadingAnimation === false); 

    else if (LoadingAnimation === true){

      return (
          
        <LoadingAnimation />

      )
    }
  }

  return (
    <section className="restaurantSearchSection">
      <div className="wrapper-SearchPage">
        <h2>Where Would You Like to Go?</h2>
        <form onSubmit={handleSubmit} className='searchPageFormApi'>
          <label htmlFor="newTrip" aria-label="Add new trip"></label>
          <input placeholder="Search for a city" type="text" id="newTrip" value={userInput} onChange={handleInputChange} />
          <button onClick={YELPAPICall}>Search</button>
        </form >
        {/* Conditional rendering functions call */}
        {RenderAPICall()}
        {renderLoadingAnimation()}
      </div>
    </section>
  );
}

export default RestaurantSearchPage;
