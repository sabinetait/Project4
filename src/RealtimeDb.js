import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, set, remove, push } from 'firebase/database';
const RealtimeDb = () => {
    const database = getDatabase(firebase);
    const [productList, setProductList] = useState([]);
    const [fire, setFire] = useState("");
    const [userInput, setUserInput] = useState('');
    
    useEffect(() => {
        const dbRootAddress = ref(database, 'City/');
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
                                <p >{productList[`${key}`].city}</p>
                                <p >{productList[`${key}`].restaurant}</p>
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
        const databaseReference = ref(database, `City/${fire}`)
        remove(databaseReference);
    };
    
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
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