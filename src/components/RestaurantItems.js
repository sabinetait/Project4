import ButtonLiked from './ButtonLiked.js'

const RestaurantItems = (props) => {
    const RestItems = props.RestaurantItemsMap;
    return (
        <>
            {RestItems.map((restaurant) => {
              return (
                //Uncapitalize everything for class name, switch to camelCase 
                <li className='RestaurantItemOne' key={restaurant.id}>
                  
                  <h2>{restaurant.name}</h2>

                  <div className="RestaurantRatingContainer">
                    <h3>Rating: <span className="RestaurantRating">{restaurant.rating}</span></h3>
                  </div>
                  
                  <div className='RestaurantItemIMGContainer'>
                      <ButtonLiked cityName={`${props.userInput}`} image={restaurant.image_url} restaurantName={restaurant.name} />
                    <img className='RestaurantItemIMG' src={restaurant.image_url} alt={restaurant.name}/>
                  </div>
                  
                  <div className="RestaurantLocationContainer">
                    <h3 className="RestaurantLocationHeading">Location:</h3>
                    { restaurant.location.display_address.map((location, index) => {
                      return (
                        <p key={index}>{location}</p>
                      );
                    }) }
                  </div>
                  
                  <div className="RestaurantCuisineContainer">
                    <h3>Cuisine:</h3>
                    { restaurant.categories.map( (cuisine, index) => {
                      return (
                        <p key={index}>{cuisine.title}</p>
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
        </>
    )
}

export default RestaurantItems