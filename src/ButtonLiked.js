import { getDatabase, set, ref } from 'firebase/database';

const ButtonLiked = (props) => {
    const writeUserData = (event) => {
        event.preventDefault();
        const db = getDatabase();
        //Regex passed api restaurant name
        let selectedRestaurantName = props.restaurantName.replace(/ /g,'');
        set(ref(db, `City/${props.cityName}/Restaurant/${selectedRestaurantName}`), {
            name: props.restaurantName, image: props.image
        });
    }
    return (
        <>
            <button onClick={writeUserData}>Add to my trip</button>
        </>
    )
}

export default ButtonLiked;