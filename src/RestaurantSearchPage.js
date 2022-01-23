import './App.css';
import React, { useState, useEffect } from "react";
import LoadingAnimation from './LoadingAnimation.js';

function RestaurantSearchPage() {
  const loader = document.querySelector(".lds-default");
  const hideLoader = () => loader.classList.add('loader--hide');
  const [ProductItem, setProductItem] = useState([]);
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
        setProductItem(data.businesses);
        console.log(ProductItem)
      });
    
    console.log(ProductItem)
    
  }

  const RenderAPICall = () => {
    
    if (ProductItem === null || ProductItem === ' ' || ProductItem === undefined || ProductItem.length === 0); 
    
    else {
    
      return (
        <React.Fragment>
          <div className={`Loading${loadingAnimation ? " show" : " hide"}`}><LoadingAnimation/></div>
          
          <ul className='RestaurantItems'>
          {ProductItem.map((product) => {
            return (
                <li className='RestaurantItemOne' key={product.id}>
                <p>{product.name}</p>
                <div className='RestaurantItemIMGContainer'>
                  <img className='RestaurantItemIMG' src={product.image_url} alt={product.name}/>
                </div>
                {
                  product.location.display_address.map( (location) => {
                    return (
                      <p>{location}</p>
                    )
                  })
                }
                
                <p>{product.rating}</p>

                {
                  product.categories.map( (cuisine) => {
                    return (
                      <p>{cuisine.title}</p>
                    )
                  })
                }

                <p>{product.price}</p>
                </li>
            );
        })}
        </ul>
        </React.Fragment>
        )
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endAnimation = () => {
      setLoadingAnimation(false);
    }
    RenderAPI(); 
    setLoadingAnimation(true);
    setTimeout(endAnimation, 4000)
    
  }
  return (
    <div className="">
      
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
        {RenderAPICall()}
     
    </div>
  );
}

export default RestaurantSearchPage;
