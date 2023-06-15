import {useState, useEffect} from "react";
import DisplayNotes from "./displayNotes";
import Form from "./form";
import Title from "./title";
import SearchAppBar from "./searchAppBar";
import nodeService from "./services/node";
import { CssBaseline } from "@mui/material";


const App = () => {
  const [input, setInput] = useState('')
  const [notes, setNote] = useState([])
  const [view, setView] = useState(true)

  const toggleTitle =  () => setView(!view);

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
    
  const noteToDisplay = view ? notes : notes.filter(item => item.important);      

  const addNote = (event) => {
    event.preventDefault()

    const newNote = {
      content:input,
      important:Math.random() < 0.5
    }

    nodeService.addResource(newNote).then(
      data => {
        setNote(notes.concat(data));
        setInput(' ');
      } 
    )
  }


  return (
    <div>
      <SearchAppBar view={view} toggleTitle={toggleTitle}/>
      <main>
        <CssBaseline />
        <Title />
        <Form addNote={addNote} handleChange={handleChange} input={input}/>
        <DisplayNotes noteToDisplay={noteToDisplay} toggleImportance={toggleImportance} deleteNote={deleteNote} />     
        
      </main>
    </div>
  );
}

export default App;

