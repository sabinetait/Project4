import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, set, remove, push } from 'firebase/database';
import { dblClick } from '@testing-library/user-event/dist/click';
const RealtimeDb = () => {
    const database = getDatabase(firebase);
    const [productList, setProductList] = useState([]);
    const [fire, setFire] = useState("");
    const [userInput, setUserInput] = useState('');
    const [prompt, setPrompt] = useState(false);
    
    useEffect(() => {
        const dbRootAddress = ref(database, 'City/toronto/Restaurant/');

        onValue(dbRootAddress, (response) => {
            if (response.val() === null) {
                setProductList([])
            } else {
                setProductList(response.val())
            }
        }, [])
    }, [database])

    const writeUserData = (event) => {
        event.preventDefault();
        const db = getDatabase();

        set(ref(db, `City/${userInput}/`), {
            name: "Tacos Diner",
            city: "London",
            restaurant: "Poor Service"
        });
    }
    const renderMap = () => {
        if (productList === null || productList === undefined || productList === "" || productList.length === 0);
        else {
            return (
                <>
                    {Object.keys(productList).map((key, index) => (
                        <>
                            <li id={`${key}`} key={index}>
                                <p >{productList[`${key}`].name}</p>
                                <img src={productList[`${key}`].image} alt={productList[`${key}`].name} />
                                <button value={`${key}`} onClick={(event) => { setFire(`${event.target.value}`); handleRemoveTrip()}}>Click to Remove</button>
                            </li>
                        
                        </>
                    ))}
                </>
            )
        }
    }

    const handleRemoveTrip = () => {
        console.log(fire);
        setPrompt(true);


        // const databaseReference = ref(database, `City/${fire}`)
        // remove(databaseReference);
    };
    
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleRemoveRestaurant = () => {
        console.log(fire);
        const databaseReference = ref(database, `City/toronto/Restaurant/${fire}`);
        remove(databaseReference);
        setPrompt(false);
    };

    return (
        <>
            <h2>Trips List</h2>
            {renderMap()}
            <form action="submit">
                <label htmlFor="newTrip" aria-label="Add new trip"></label>
                <input placeholder="Add a new trip" type="text" id="newTrip" value={userInput} onChange={handleInputChange} />
                <button onClick={writeUserData}>Add a trip</button>
            </form>

            <div className={`prompt${prompt? " opened" : " closed"}`}>
                <p>Are you sure you want to remove this restaurant?</p>
                <button onClick={() => { handleRemoveRestaurant()}}>Yes, remove</button>
                <button onClick={() => setPrompt(false)}>No, go back</button>
            </div>
             
            
        </>
    )
}
export default RealtimeDb;


//Important DO NOT DELETE IN ANY CIRCUMSTANCES NECESSARY FOR A COMPONENT THAT MAY BE NEEDED TO BE CREATED .........................


//{Object.keys(productList).map((key) => (
  //  <>
    // <p key={key}>{productList[`${key}`]}</p>
       // <button onClick={() => { handleRemoveTrip(); setFire(key) }}>Click to Remove</button>
    // </>
//))}