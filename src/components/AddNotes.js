import { getDatabase, set, ref } from 'firebase/database';
import { useState } from 'react';

const AddNotes = (props) => {

    const [ userNote, setUserNote ] = useState("");
    const [ formOpen, setFormOpen ] = useState(false);

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        const db = getDatabase();
        set(ref(db, `City/${props.cityName}/Restaurant/${props.restaurantName}`), {
            message: userNote, image: props.restImage, name: props.restaurantName
        });
        setFormOpen(false); 
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        setUserNote(event.target.value);
    }
    
    return (
        <div>
            <button onClick={() => setFormOpen(true)}>Add a Note</button>
            <div className={`formShowing${formOpen ? " opened" : " closed"}`}>
                <form onSubmit={handleNoteSubmit}>
                    <label aria-label="Add a note here" htmlFor="restaurantNote"></label>
                    <input onChange={handleInputChange} value={userNote} name="restaurantNote" id="restaurantNote"></input>
                    <button type="submit">Done</button>
                </form>
            </div>
        </div>
    )
}

export default AddNotes;