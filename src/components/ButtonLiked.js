import { getDatabase, set, ref } from 'firebase/database';

const ButtonLiked = (props) => {

    const writeUserData = (event) => {
       
        event.preventDefault();
        const db = getDatabase();
        
        //Sets city on firebase based on user click.
        set(ref(db, `City/${props.cityName}/Restaurant/${props.restaurantName}`), {
            name: props.restaurantName, image: props.image, message: ""
        });

        //Sets saved cities on saved node. 
        set(ref(db, `Saved/${props.cityName}/`), {
            name: `${props.cityName}`,
        });
      
    }
    return (

        <div onClick={writeUserData} className="ButtonLiked">
            <i className="far fa-plus-square"></i>
        </div>
    )
}

export default ButtonLiked;