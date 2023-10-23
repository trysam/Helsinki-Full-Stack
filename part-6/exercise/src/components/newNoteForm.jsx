import { useDispatch } from "react-redux";
import { createNote } from "../reducers/reducer";




const Note = () => {

    const dispatch =useDispatch()

    const addNote = (event) => {    
        event.preventDefault()
        const content = event.target.note.value;
        event.target.note.value = '';
        dispatch(createNote(content))
      }  


    return(
        <form onSubmit={addNote}>
            Input new note here:  <input type="text" name="note"/>
            <button type="submit">submit</button>
        </form>    
    )
}

export default Note