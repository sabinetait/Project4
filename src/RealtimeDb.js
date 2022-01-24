import { useEffect, useState } from 'react';
import firebase from './Firebase';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const RealtimeDb = () => {
    const database = getDatabase(firebase);
    const [ productList, setProductList] = useState([]);

    useEffect( ()=>{
        const dbRootAddress = ref(database, 'City');
        onValue(dbRootAddress, (response)=>{
        if(response.val() === null){
            setProductList([])
        } else{
            setProductList(Object.entries(response.val()))
          
        }
        },[])
    }, [database])
    
    console.log(productList);

    const writeUserData = () => {
    const db = getDatabase();
    set(ref(db, `City/Towns/`), {
        name: "asdafdsaf",
        city: "toronto",
        restaurant: "akldad"
    });
    }
    
    const renderMap = () => {
        
        if (productList === null || productList === undefined || productList === "" || productList.length === 0);

        else {

            return (
                <>
                    <p className='wrapper'>{productList[0].Towns}</p>
                </>

               
            )


        }
    }


    return (
        <>
            <p>Hello</p>
            <button onClick={writeUserData}>Click me</button>
            
            {renderMap()}
       
        </>

    )
}

    export default RealtimeDb;