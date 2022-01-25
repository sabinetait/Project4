import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, set, remove, push } from 'firebase/database';
const RealtimeDb = () => {
    const database = getDatabase(firebase);
    const [productList, setProductList] = useState([]);
    const [fire, setFire] = useState("");
    const [userInput, setUserInput] = useState('');
    useEffect(() => {
        const dbRootAddress = ref(database, 'City/Restaurant');
        onValue(dbRootAddress, (response) => {
            if (response.val() === null) {
                setProductList([])
            } else {
                setProductList(response.val())
            }
        }, [])
    }, [database])
    console.log(productList);
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
                    {Object.keys(productList).map((key) => (
                        <>
                            <p key={key}>{productList[`${key}`]}</p>
                            <button onClick={() => { handleRemoveTrip(); setFire(key) }}>Click to Remove</button>
                        </>
                    ))}
                </>
            )
        }
    }
    const handleRemoveTrip = () => {
        const databaseReference = ref(database, `City/Restaurant/${fire}`)
        remove(databaseReference);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (userInput.length > 3) {
    //         push(database, userInput);
    //         setUserInput('');
    //     }
    //     else {
    //         alert("needs to be Longer");
    //     }
    // };
    
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };
    return (
        <>
            <p>Hello</p>
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