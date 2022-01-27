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
                  
                  <h2>{restaurant.name}</h2>

                  {renderPrice()}
                  
                  <div className='restaurantItemImgContainer'>
                      <ButtonLiked cityName={`${props.userInput}`} image={restaurant.image_url} restaurantName={restaurant.name} />
                    <img className='RestaurantItemIMG' src={restaurant.image_url} alt={restaurant.name}/>
                  </div>
                  
                  <div className="restaurantDetailsContainer">
                    <div className="restaurantDetails">
                      <h3 className="restaurantLocationHeading">Location:</h3>
                      { restaurant.location.display_address.map((location, index) => {
                        return (
                          <p key={index}>{location}</p>
                        );
                      }) }
                    </div>
                    
                    <div className="restaurantDetails">
                      <h3>Cuisine:</h3>
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