import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Filter from './components/filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App