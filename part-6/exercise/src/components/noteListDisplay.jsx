import { useDispatch, useSelector } from "react-redux";
import { toggleImportantOf } from "../reducers/noteReducer";

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

    return(
        <ul>
            {notes.map(note => 
                <Note 
                    note={note} 
                    toggleImportant={() => dispatch(toggleImportantOf(note.id))} 
                    key={note.id}
                />
            )}
        </ul>
    )
}

export default Notes