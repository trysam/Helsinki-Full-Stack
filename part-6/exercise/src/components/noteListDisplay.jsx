import { useDispatch, useSelector } from "react-redux";
import { toggleImportant, toggleImportantOf } from "../reducers/noteReducer";
import noteService from "../services/notes"

const Note = ({note, toggleImportant}) => {
    return(
        <li>  
            {note.content} 
            <strong>{note.important ? "Important" : "" }</strong>
            <button onClick={toggleImportant}>
                {note.important ? "make unimportant" : "make Important" }
            </button>
        </li>    
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({notes, filter,_ }) => { 
        if (filter === 'ALL'){            
            return notes}
        return filter === 'IMPORTANT' 
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })

    const handleToggleImportant = async (note) => {
        const toggledImportantNote = {...note, 'important': !note.important}
        dispatch(toggleImportant(note.id, toggledImportantNote))       
    }

    return(
        <ul>
            {notes.map(note => 
                <Note 
                    note={note} 
                    toggleImportant={() => handleToggleImportant(note)} 
                    key={note.id}
                />
            )}
        </ul>
    )
}

export default Notes