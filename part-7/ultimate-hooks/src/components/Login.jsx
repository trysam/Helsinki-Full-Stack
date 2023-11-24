import { useField, useResource } from "../hooks/hooks"
import { useNavigate } from "react-router"


// eslint-disable-next-line react/prop-types
const Login = ({setUser, setMessage}) => { 

    const {['reset']: resetUsername, ...usernameField} = useField()
    const {['reset']: resetPassword, ...passwordField} = useField('Password')
  
    const [, LoginService] = useResource('http://localhost:3001/api/login')
  
    const navigate = useNavigate() 
    
    const handleLoginSubmit = async(event) => {    
      event.preventDefault()
      try {
        const newUser = await LoginService.login({username:usernameField.value, password:passwordField.value})
        window.localStorage.setItem('userDetails',JSON.stringify(newUser)) 
        setUser(newUser)
        setMessage(`Welcome ${newUser.username}`)
        setTimeout(() => setMessage(null), 5000)
        resetUsername('')   
        resetPassword('')
        navigate('/notes')      
        } catch(exemption){
        setMessage(exemption.message)
        setTimeout(() => setMessage(null), 5000)
      }
    }
  
    return (
      <div>
        <form onSubmit={handleLoginSubmit}>
          Username <input {...usernameField}/><br/>
          Password <input {...passwordField} /> <br />
          <button>Login</button>
        </form>
      </div>
    )
  }
  
export default Login