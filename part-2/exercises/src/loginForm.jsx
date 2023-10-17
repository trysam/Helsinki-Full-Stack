
const LoginForm = ({loginHandler, username, setUsername, password, setPassword}) => {

  return (
   <form onSubmit={loginHandler}>
     <div>
        Username  
        <input 
            type='text'
            value={username}
            name= 'Username'
            id="username"
            onChange={({target}) => setUsername(target.value)}
        />
     </div>
     <div>
        Password 
        <input
            type='password'
            value={password}
            name='password'
            id="password"
            onChange= {({target}) => setPassword(target.value)}
        />
     </div>
     <button id='loginButton' type='submit'>Login</button>
   </form>
  )
}

export default LoginForm