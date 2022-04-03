import { getDatabase, set, ref } from 'firebase/database';
import { useState } from 'react';

const AddNotes = (props) => {
    const [ userNote, setUserNote ] = useState("");
    const [ formOpen, setFormOpen ] = useState(false);

    //Handles writing note onto firebase 
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
        <>
            <button className="noteButton" onClick={() => setFormOpen(true)}>Add a Note</button>
            {/* Prompt note form open or close */}
            <div className={`formShowing${formOpen ? " opened" : " closed"}`}>
                <form onSubmit={handleNoteSubmit}>
                    <div className="noteFormInputs">
                        <label aria-label={`Add a note here for ${props.restaurantName}`} htmlFor="restaurantNote"/>
                        <textarea className="addNotesTextarea" onChange={handleInputChange} value={userNote} name="restaurantNote" id="restaurantNote"></textarea>
                        <button type="submit" >Done</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNotes;