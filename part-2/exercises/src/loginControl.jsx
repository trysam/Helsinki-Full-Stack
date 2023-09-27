
import LoginForm from "./loginForm"
const LoginControl = ({loginHandler, username, setUsername, password, setPassword, loginVisible, setLoginVisible}) => {
    const showWhenVisible = {display: loginVisible ?  "" : 'none' }

  return (
    <div>        
        <div style={showWhenVisible}>
            <LoginForm 
              loginHandler={loginHandler} 
              password={password} 
              setPassword={setPassword} 
              setUsername={setUsername} 
              username={username}
            /> 
            <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>

    </div>
  )
}

export default LoginControl