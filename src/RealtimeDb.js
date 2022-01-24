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
            setProductList(response.val())
            console.log(productList);
            console.log(productList);
        }
        },[])
    }, [productList])

        console.log(productList);
        console.log(productList);    

    const writeUserData = () => {
    const db = getDatabase();
    set(ref(db, 'City/'), {
        name: "asdafdsaf",
        city: "toronto",
        restaurant: "akldad"
    });
  }
    return (
        <>
            <p>Hello</p>
            <button onClick={writeUserData}>Click me</button>
            {/* {productList.length === 0 ? null: <p>nothing returned</p>}
            {productList.map((product) => {
                return (
                    <p>{product.name}</p>
                )
            })} */}
        </>

    )
}

export default RealtimeDb;