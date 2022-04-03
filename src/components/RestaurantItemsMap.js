import ButtonLiked from './ButtonLiked.js'

//Props that send back json data from yelp api.
const RestaurantItemsMap = (props) => {
    const restItems = props.RestaurantItemsMap;

    //Renders yelp api map data. 
    return (
      <>
        {restItems.map((restaurant) => {
          return (
            <li className='restaurantItemOne' key={restaurant.id}>
              <h3>{restaurant.name}</h3>
              <div className='ratingAndPrice'>
                  <h4>Rating: {restaurant.rating}</h4>
                  <h4>Price: {restaurant.price}</h4>
              </div>
              <div className='restaurantItemImgContainer'>
                <ButtonLiked userInputTerm={props.userInputTerm} cityName={`${props.userInput}`} image={restaurant.image_url} restaurantName={restaurant.name} />
                <img className='RestaurantItemIMG' src={restaurant.image_url} alt={restaurant.name}/>
              </div>
              {/* Renders restaurant address */}
              <div className="restaurantDetailsContainer">
                <div className="restaurantDetails">
                  <h4 className="restaurantLocationHeading">Location:</h4>
                  { restaurant.location.display_address.map((location, index) => {
                    return (
                      <p key={index}>{location}</p>
                    );
                  }) }
                </div>
                {/* Renders restaurant cuisine type. */}
                <div className="restaurantDetails">
                  <h4>Cuisine:</h4>
                  { restaurant.categories.map( (cuisine, index) => {
                    return (
                      <p key={index}>{cuisine.title}</p>
                      );
                    }) }
                </div>
              </div>
            </li>
          );
        }) }
      </>
    )
}

export default RestaurantItemsMap