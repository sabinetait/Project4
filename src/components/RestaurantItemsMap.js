import ButtonLiked from './ButtonLiked.js'

const RestaurantItemsMap = (props) => {
    const restItems = props.RestaurantItemsMap;

    return (
        <>
            {restItems.map((restaurant) => {
              return (
                //Uncapitalize everything for class name, switch to camelCase 
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
                  
                  <div className="restaurantDetailsContainer">
                    <div className="restaurantDetails">
                      <h4 className="restaurantLocationHeading">Location:</h4>
                      { restaurant.location.display_address.map((location, index) => {
                        return (
                          <p key={index}>{location}</p>
                        );
                      }) }
                    </div>
                    
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