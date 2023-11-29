/* eslint-disable react/prop-types */
import { Routes, Route, Link, Navigate, useNavigate,  useMatch} from 'react-router-dom'
import { useState } from 'react' 
import DisplayCounter from './components/counter'
import SignOnForm from './components/SignOnForm'
import {Table, Form, Button, Alert, Navbar, Nav} from 'react-bootstrap';

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
  </div>
)


const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes}) => (
  <div>
    <h2>Notes</h2>    
    <Table striped>
      <tbody>   
         {notes.map(note =>
             <tr key={note.id}>         
              <td>
                <Link to={`/notes/${note.id}`}>{note.content} </Link>
              </td>
              <td>
                {note.user}
              </td>  
            </tr>     
          )}
            
      </tbody>
    </Table>
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = ({onLogin}) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    onLogin(event.target.username.value)
    navigate('/')
  }

  return (
    <div className='container' style={{textAlign:''}}>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label> Username: </Form.Label> 
          <Form.Control type='text' name='username' style={{maxWidth:"20rem"}}/><br/>
          <Form.Label>Password: </Form.Label>
          <Form.Control type='password' style={{maxWidth:"20rem"}} /><br/>      
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}


const App = () => {

  // eslint-disable-next-line no-unused-vars
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const onLogin = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const match = useMatch('/notes/:id')
  const note = match ? notes.find(n => n.id === Number(match.params.id)) : null


  const padding = {
    padding: 5,
    textDecoration:'none'
  }

  return (
    <div className='container'>  
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <Nav.Link href='#' as='span'>
               <Link style={padding } to={'/'}>home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to={'/notes'}>notes</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to={'/users'}>users</Link> 
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to={'/counterApp'}>CounterApp</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to={'/signOn'}>Sign-On</Link> 
            </Nav.Link>
            <Nav.Link href='#' as='span'>
            {user ? <em> {`Welcome ${user}`} </em> : <Link style={padding} to={'/login'} >Login</Link>}
            </Nav.Link>     
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {message && <Alert variant='success'>{message} </Alert>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes notes={notes} />}/>
        <Route path='/users' element={user ? <Users /> : <Navigate replace to={'/login'} />} />
        <Route path='/login' element={<Login onLogin={onLogin} />}/> 
        <Route path='/signOn' element={<SignOnForm />} />        
        <Route path='/notes/:id' element={<Note note={note}/>}/> 
        <Route path='/counterApp' element={<DisplayCounter />}/>
      </Routes>
    <footer>
      <br />
      <em>Note app, Department of Computer Science 2023</em>
    </footer>
  </div>  
  )
}

export default App