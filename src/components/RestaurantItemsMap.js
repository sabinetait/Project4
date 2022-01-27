import ButtonLiked from './ButtonLiked.js'

const RestaurantItemsMap = (props) => {
    const restItems = props.RestaurantItemsMap;

    const renderPrice = () => {
      if (price === null || price === undefined || price === '' || price.length === 0 )

      { return (
        <div className="restaurantRatingContainer">
        <h3>Rating: <span className="restaurantRating">{rating}('Price unavailable')</span></h3>
        </div>
      )} else {
        return (
          <div className="restaurantRatingContainer">
          <h3>Rating: <span className="restaurantRating">{rating}{price}</span></h3>
          </div>
        )
      }
    }

    const {rating, price} = restItems;

    return (
        <>
            {restItems.map((restaurant) => {
              return (
                //Uncapitalize everything for class name, switch to camelCase 
                <li className='restaurantItemOne' key={restaurant.id}>
                  
                  <h3>{restaurant.name}</h3>

                  {renderPrice()}
                  
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