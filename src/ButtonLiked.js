import { getDatabase, set, ref } from 'firebase/database';

const ButtonLiked = (props) => {

    const writeUserData = (event) => {
       
        event.preventDefault();
        const db = getDatabase();
        let selectedRestaurantName = props.restaurantName.replace(/ /g,'');
        set(ref(db, `City/${props.cityName}/Restaurant/${selectedRestaurantName}`), {
            name: props.restaurantName, image: props.image
        });
        
        set(ref(db, `Saved/${props.cityName}/`), {
            name: `${props.cityName}`,
        });
    }
    return (
        <>
            <button onClick={writeUserData}>Add to my trip</button>
        </>
    )
}

export default ButtonLiked;