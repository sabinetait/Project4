import { getDatabase, set, ref } from 'firebase/database';

const ButtonLiked = (props) => {

    const writeUserData = (event) => {
       
        event.preventDefault();
        const db = getDatabase();
        
        set(ref(db, `City/${props.cityName}/Restaurant/${props.restaurantName}`), {
            name: props.restaurantName, image: props.image, message: ""
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