import AnecdoteForm from './components/AnecdoteForm'
import DisplayNotes from './components/DisplayAnecdotes'
import Notification from './components/Notification'

const App = () => {

  return (  
      <div>
        <h3>Anecdote app</h3>
            
        <Notification />
        <AnecdoteForm />
        <DisplayNotes />
      </div>
  )
}

export default App
