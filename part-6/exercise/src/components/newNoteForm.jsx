import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { createNewNote } from "../reducers/noteReducer";
import noteService from "../services/notes";




const Note = () => {

    const dispatch =useDispatch()

    const addNote = async (event) => {    
        event.preventDefault()
        const content = event.target.note.value;
        event.target.note.value = '';              
        dispatch(createNewNote(content))
      }  


    return(
        <form onSubmit={addNote}>
            Input new note here:  <input type="text" name="note"/>
            <button type="submit">submit</button>
        </form>    
    )
}

export default Note