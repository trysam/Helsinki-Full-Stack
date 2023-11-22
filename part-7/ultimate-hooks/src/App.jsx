import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import routeService from './service/service'


const useField = (type, key) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }


  return {
    key,
    type,
    value,
    onChange,
    setValue
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
 
  useEffect(
    () => {routeService.getAll(baseUrl).then(data => setResources(data))},
  [baseUrl])


  const create = async (resource) => {
    const token = routeService.setToken(JSON.parse(window.localStorage.getItem('useDetails')).token)
    const response = routeService.create(baseUrl, resource, token)
    return response
  }

  const login = async (resource) => {    
    const response = routeService.create(baseUrl, resource)
    return response
  }

  const update = async (resource, id) => {
    const response = routeService.create(baseUrl, resource, id)
    return response
  }

  const service = {
    create,
    login,
    update,
    setResources
  }

  return [
    resources, service
  ]
}

const App = () => {
  const {['setValue']: resetContent, ...content} = useField('text', 'content')
  const {['setValue']: resetName, ...name} = useField('text', 'name')
  const {['setValue']: resetNumber, ...number} = useField('text', 'number')
  const {['setValue']: resetUsername, ...username} = useField('text', 'username')
  const {['setValue']: resetPassword, ...password} = useField('Password', 'password')

  const [notes, noteService] = useResource('http://localhost:3001/api/notes')
  const [persons, personService] = useResource('http://localhost:3005/api/persons')
  const [, LoginService] = useResource('http://localhost:3001/api/login')

  const userDetails = JSON.parse(window.localStorage.getItem('userDetails'))
  

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    const newNote= noteService.create({ content: content.value })
    noteService.setResources(notes.concat(newNote))
    resetContent('')
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const newPerson = await personService.create({ name: name.value, number: number.value})
    personService.setResources(persons.concat(newPerson))
    resetName('')
    resetNumber('') 
  }


  const Note = () => {
    return (
      <div>
          <h2>notes</h2>
          <form onSubmit={handleNoteSubmit}>
            <input {...content} />
            <button>create</button>
          </form>
          {notes.map(n => <p key={n.id}>{n.content}</p>)}
      </div>
    )
  }

  const Person = () => {
    return(
      <div>
          <h2>persons</h2>
          <form onSubmit={handlePersonSubmit}>
            name <input {...name} /> <br/>
            number <input {...number} />
            <button>create</button>
          </form>
          {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>

   
    )
  }

  const Login = () => { 
    const navigate = useNavigate() 
    
    const handleLoginSubmit = async(event) => {    
      event.preventDefault()
      const newUser = await LoginService.login({username:username.value, password:password.value})
      window.localStorage.setItem('userDetails',JSON.stringify(newUser)) 
      resetUsername('')   
      resetPassword('')
      navigate('/')      
    }
  
    return (
      <div>
        <form onSubmit={handleLoginSubmit}>
          Username <input {...username}/><br/>
          Password <input {...password} /> <br />
          <button>Login</button>
        </form>
      </div>
    )
  }

  return (    
    <div> 
     <Router>
          <Link style={{paddingLeft:'1rem'}} to={'/'}>Note</Link>
          <Link  style={{paddingLeft:'1rem'}} to={'/persons'}>Persons</Link>
          {userDetails.username ? <Link style={{paddingLeft:'1rem'}} to={'/login'}>Login</Link> : <Navigate replace to={'/'}/>}

          <Routes>
            <Route path='/' element={<Note />}/>
            <Route path='/persons' element={<Person />}/>
            <Route path='/login' element={<Login />} />
          </Routes>
      </Router> 
      
       
    </div>
  )
}

export default App