const Note = ({note, toggleImportance, deleteNote}) => {
    const label = note.important? "make unimportant" : "make important";
    return  <li>
                {note.content}{" "}
                <button onClick={toggleImportance}>{label}</button>
                <button onClick={deleteNote}>DeleteNote</button>
            </li> 
}

export default Note;