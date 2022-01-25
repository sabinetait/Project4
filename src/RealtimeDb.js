import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const RealtimeDb = () => {
    const database = getDatabase(firebase);
    const [ cityList, setCityList] = useState([]);

    useEffect( ()=>{
        const dbRootAddress = ref(database, 'City');
        onValue(dbRootAddress, (response)=>{
        if(response.val() === null){
            setCityList([])
        } else {
            const data = response.val()
            for(let key in data) {
                console.log(key, data[key]);

                if(key === 'Restaurant') {
                    setCityList(data[key]);
                    console.log(cityList);
                }
            }
        }
        },[])
    }, [database])
    

    const writeUserData = () => {
    const db = getDatabase();
    set(ref(db, `City/Restaurant/`), {
        note1: "someeething1",
        note2: "someeething2",
        note3: "someeething3"
    });
    }


    return (
        <>
            <p>Hello</p>
            <button onClick={writeUserData}>Click me</button>
            
            {/* {renderMap()} */}
       
        </>

    )
}

export default RealtimeDb;