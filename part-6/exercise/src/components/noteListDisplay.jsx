import { useDispatch, useSelector } from "react-redux";
import { toggleAction } from "../reducers/reducer";

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
    const notes = useSelector(state => state)

    return(
        <ul>
            {notes.map(note => 
                <Note 
                    note={note} 
                    toggleImportant={() => dispatch(toggleAction(note.id))} 
                    key={note.id}
                />
            )}
        </ul>
    )
}

export default Notes