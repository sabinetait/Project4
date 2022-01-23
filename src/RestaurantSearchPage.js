import './App.css';
import React, { useState } from "react";
import LoadingAnimation from './LoadingAnimation.js';

function RestaurantSearchPage() {
  const [RestaurantItem, setRestaurantItem] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const RenderAPI = () => {
    const proxiedUrl = 'https://api.yelp.com/v3/businesses/search';
    const url = new URL('http://proxy.hackeryou.com');

    url.search = new URLSearchParams({
      reqUrl: proxiedUrl,
      'params[term]': 'restaurants',
      'params[location]': `${userQuery}`,
      'proxyHeaders[Authorization]': 'Bearer SH6cIaiOu4yFDQ9M6w-8GGkgwaEdtzV1HmQ461hIForr3PDqa-_AwLRfvIkPqrDYKuSvAh9YRLkMSf2BsVEswIWTOGDwrnzM18PA8DEr6elO4j3eBDNqZGixXUbrYXYx',
    });
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setRestaurantItem(data.businesses);
        console.log(RestaurantItem)
      });
    
    console.log(RestaurantItem)
    
  }

  const RenderAPICall = () => {
    
    if (RestaurantItem === null || RestaurantItem === ' ' || RestaurantItem === undefined || RestaurantItem.length === 0);
    
    else {
    
      return (
        <>
        
          <div className={`Loading${loadingAnimation ? " show" : " hide"}`}>
            <LoadingAnimation/>
          </div>

          <ul className='RestaurantItems'>
            { RestaurantItem.map((restaurant) => {
              return (
                <li className='RestaurantItemOne' key={restaurant.id}>
                  
                  <h2>{restaurant.name}</h2>
                  
                  <div className='RestaurantItemIMGContainer'>
                    <img className='RestaurantItemIMG' src={restaurant.image_url} alt={restaurant.name}/>
                  </div>
                  
                  <div className="RestaurantLocationContainer">
                    <h3 className="RestaurantLocationHeading">Location:</h3>
                    { restaurant.location.display_address.map((location) => {
                      return (
                        <p>{location}</p>
                      );
                    }) }
                  </div>
                
                  <div className="RestaurantRatingContainer">
                    <h3>Restaurant Rating:</h3>
                    <p>{restaurant.rating}</p>
                  </div>
                  
                  <div className="RestaurantCuisineContainer">
                    <h3>Cuisine:</h3>
                    { restaurant.categories.map( (cuisine) => {
                      return (
                          <p>{cuisine.title}</p>
                        );
                      }) }
                  </div>
                  
                  { restaurant.price ? 
                    <div className="RestaurantPriceContainer">
                      <h3>Restaurant Price Range:</h3>
                      <p>{restaurant.price}</p>
                    </div> : null }

                </li>
              );
            }) }
          </ul>
        </>
      );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endAnimation = () => {
      setLoadingAnimation(false);
    };
    RenderAPI(); 
    setLoadingAnimation(true);
    setTimeout(endAnimation, 4000);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <label>
        <input
            required
            type="text"
            onChange={(e) => setUserQuery(e.target.value)}
            value={userQuery}
            placeholder="Search By City"
            />
        </label>
        <input type="submit" className="submit" value="Submit" />
      </form>
      { RenderAPICall() }
    </div>
  );
}

export default RestaurantSearchPage;
