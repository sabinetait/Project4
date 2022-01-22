import './App.css';
import React, { useState } from "react";

function ResturantSearchPage() {
  
  const [ProductItem, setProductItem] = useState([]);
  const [userQuery, setUserQuery] = useState('')

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
        <div className="">
            
        {ProductItem.map((product) => {
            return (
                <div className='' key={product.id}>
                <p>{product.name}</p>
                <img src={product.image_url} alt={product.name}/>
                </div>
            );
        })}
    
    </div>
        )
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    RenderAPI(); 
  }
  return (
    <div className="">
      <header className="">
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
      </header>
    </div>
  );
}

export default ResturantSearchPage;
