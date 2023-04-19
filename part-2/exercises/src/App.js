import {useState, useEffect} from "react";
import Note from "./note";
import nodeService from "./services/node"

const App = () => {
  const [input, setInput] = useState('')
  const [notes, setNote] = useState([])
  const [view, setView] = useState(true)

  const handleChange = (event) =>{
    setInput(event.target.value);
  }

  const toggleImportance = (id) => {   
    const note = notes.find(note => note.id === id);
    const changeNote  = {...note, important:!note.important}

    nodeService.updateResource(id,changeNote).then(
      data => setNote(notes.map(note => note.id !== id ? note : data))
    ).catch(error => alert(`${note.content} " has been deleted"`))           
  }

  const deleteNote = (id) => {  
    nodeService.deleteResource(id).then(
      () => setNote(notes.filter(note => note.id !== id))
    )
  }


  useEffect(() => {
    nodeService.getAllResourse().then(      
      data => setNote(data)
    )}, [])
    
  const noteToDisplay = view ? notes : notes.filter(item => item.important)      

  const addNote = (event) => {
    event.preventDefault()

    const newNote = {
      content:input,
      important:Math.random() < 0.5
    }

    nodeService.addResource(newNote).then(
      data => {
        setNote(notes.concat(data));
        setInput(" ")
      } 
    )
  }


  return (
    <div>
      <h1>{view? "All" : "Important"} Notes</h1>
      <button onClick={() => setView(!view)}>Show {view?"important": "All"}</button>      
      <ul>
        {noteToDisplay.map((note) => <Note key={note.id} note={note} 
        toggleImportance={() => toggleImportance(note.id)} deleteNote={() => deleteNote(note.id)}/>)}
      </ul>

      <form onSubmit={addNote} >
        <input value={input} onChange={handleChange} placeholder={"Write here"}></input>
        <button type="submit">Save</button>
      </form>

    </div>
  );
}

export default App;

