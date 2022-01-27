import RealtimeDb from '../firebase/RealtimeDb';
import './TripList.css';
import { useEffect, useState } from 'react';
import firebase from '../firebase/Firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

const TripsList = () => {
    
    const database = getDatabase(firebase);
    const [productList, setProductList] = useState([]);
    const [databaseRender, setDatabaseRender] = useState(false);
    const [buttonClickedValueSetting, setbuttonClickedValueSetting] = useState("");

    const buttonClickedValue = (event) => {
        
        setbuttonClickedValueSetting(`${event.target.value}`); 
        console.log(buttonClickedValueSetting); 
        setDatabaseRender(true);

    }

    useEffect(() => {

        const dbRootAddress = ref(database, 'Saved/');

        onValue(dbRootAddress, (response) => {
            if (response.val() === null) {
                setProductList([])
            } else {
                setProductList(response.val())
            }
        }, [])

    }, [database])

    const renderDataBase = () => {

        if (databaseRender === false) {
            
            return (

                <div className='savedTrips-Wrappper'>
                    <div className='TitleContainer'>
                        <h2>Your Saved Trips!</h2>
                    </div> 
                    {renderMap()}
                </div>

            )
        }

        else {
            return (
                <>
                    <RealtimeDb buttonClicked={buttonClickedValueSetting}/>
                </>
            )
        }
    }

    const renderMap = () => {
        
        if (productList === null || productList === undefined || productList === "" || productList.length === 0);
        
        else {

            return (
                
                <ul className='FirebaseTripUserSaved'>
                    
                    {Object.keys(productList).map((key, index) => (
                        
                        <li id={`${key}`} key={index}>
                            <button onClick={buttonClickedValue} value={productList[`${key}`].name}>{productList[`${key}`].name}</button>
                        </li>
    
                    ))}

                </ul>
            )
        }
    }
    
    return (
        <>
            {renderDataBase()}
        </>
    )
}

export default TripsList;