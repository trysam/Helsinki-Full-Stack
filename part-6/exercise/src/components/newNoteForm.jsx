import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import noteService from "../services/notes"




const Note = () => {

    const dispatch =useDispatch()

    const addNote = async (event) => {    
        event.preventDefault()
        const content = event.target.note.value;
        event.target.note.value = '';
        const newNote = await noteService.saveNote(content)        
        dispatch(createNote(newNote))
      }  


    return(
        <form onSubmit={addNote}>
            Input new note here:  <input type="text" name="note"/>
            <button type="submit">submit</button>
        </form>    
    )
}

export default Note