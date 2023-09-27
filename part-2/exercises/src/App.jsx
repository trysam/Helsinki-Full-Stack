import { CssBaseline } from "@mui/material";

import {useState, useEffect} from "react";
import DisplayNotes from "./displayNotes";
import NoteForm from "./noteForm";
import Title from "./title";
import SearchAppBar from "./searchAppBar";
import noteService from "./services/node";
import loginService from "./services/login";
import LoginControl from "./loginControl";


const App = () => {
  const [input, setInput] = useState('')
  const [notes, setNote] = useState([])
  const [view, setView] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    noteService.getAllResource().then(      
      initialNotes => setNote(initialNotes)
    )}, []);

  useEffect(() => {
    const loggedNoteUser = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedNoteUser) {
      const user = JSON.parse(loggedNoteUser)
      setUser(user);
      noteService.setToken(user.token)
    }
  },[])


  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})          

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)     
      setUsername('')
      setPassword('')
      setUser(user)     
    } catch(exemption){
      setErrorMessage('Wrong Credentials')
      setTimeout( () => {setErrorMessage(null)}, 5000 )
    }
    
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload()
  } 


  const toggleTitle =  () => setView(!view);
  
  const toggleImportance = (id) => {   
    const note = notes.find(note => note.id === id);
    const changeNote  = {...note, important:!note.important}

    noteService.updateResource(id,changeNote).then(
      data => setNote(notes.map(note => note.id !== id ? note : data))
    ).catch(error => alert(`${note.content} " has been deleted"`))           
  }

  const handleChange = (event) =>{
    setInput(event.target.value);
  }

  const deleteNote = (id) => {  
    noteService.deleteResource(id).then(
      () => setNote(notes.filter(note => note.id !== id))
    )
  }  

  const addNote = (event) => {
    event.preventDefault()

    const newNote = {
      content:input,
      important:Math.random() < 0.5
    }

    noteService.addResource(newNote).then(
      data => {
        setNote(notes.concat(data));
        setInput(' ');
      } 
    )
  }

  const noteToDisplay = view ? notes : notes.filter(item => item.important);      


  return (
    <div>
      <SearchAppBar 
        view={view} 
        toggleTitle={toggleTitle}
        handleLogout={handleLogout}
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
        user={user}
      />
      <main>
        <CssBaseline />
        <Title />

        {user === null
          ? <LoginControl 
              loginHandler={handleLogin} 
              password={password} 
              setPassword={setPassword} 
              setUsername={setUsername} 
              username={username}
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible}
            /> 
          : <NoteForm 
              addNote={addNote} 
              handleChange={handleChange} 
              input={input} 
            />
        }
        
        <DisplayNotes noteToDisplay={noteToDisplay} toggleImportance={toggleImportance} deleteNote={deleteNote} />     
        
      </main>
    </div>
  );
}

export default App;

