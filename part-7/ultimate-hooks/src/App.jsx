
import {Link, Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react'
import Note from './components/Notes'
import Person from './components/Person'
import Login from './components/Login'
import Notification from './components/Notification'

const userDetails = JSON.parse(window.localStorage.getItem('userDetails'))

const App = () => { 

  const [user, setUser] = useState(userDetails)  
  const [message, setMessage] = useState(null)

  const logout = () => {
    window.localStorage.removeItem('userDetails')
    setUser(null)
  }

  return (    
    <div> 
      <div>
        <Link style={{paddingLeft:'1rem'}} to='/notes' >Note</Link>
        <Link  style={{paddingLeft:'1rem'}} to='/persons' >Persons</Link>
        {user 
            ? <div> 
                  <em style={{paddingLeft:'1rem'}}> {`Welcome ${user.username}`} </em> 
                  <button onClick={logout}>Logout</button>
              </div>
            : <Link style={{paddingLeft:'1rem'}} to={'/'}>Login</Link>}
      </div>  
      <Notification message={message}/>
      <Routes>
        <Route path='/notes' element={<Note setMessage={setMessage} />}/>
        <Route path='/persons' element={<Person setMessage={setMessage} />}/>
        <Route path='/' element={ !user ? <Login setUser={setUser} setMessage={setMessage}/> : <Navigate replace to={'/notes'}/>} />
      </Routes>       
    </div>
  )
}

export default App