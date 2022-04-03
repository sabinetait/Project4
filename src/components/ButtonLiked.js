import { getDatabase, set, ref } from 'firebase/database';
import { useState } from 'react';

const ButtonLiked = (props) => {
    const [buttonLiked, setButtonLiked] = useState(false); 

    const writeUserData = (event) => {
        event.preventDefault();
        const db = getDatabase();
        
        setButtonLiked((buttonLiked) => !buttonLiked);
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
        <div  onClick={writeUserData} className={`ButtonLiked${buttonLiked ? " no" : " yes"}`}>
            <i className="far fa-plus-square"></i>
        </div>
    )
}

export default ButtonLiked;