import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const NewAnecdotes = ({anecdote}) => {
    const dispatch = useDispatch()
    return (
        <div>
            <div> {anecdote.content} </div>
            <div> 
                has {anecdote.votes}
                <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
        </div>
    ) 
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)

    return (            
        <div>
            {
                anecdotes.sort(
                    (a,b)=> b.votes - a.votes
                ).map(
                    anecdote => <NewAnecdotes anecdote={anecdote} key={anecdote.id}/>
                )
            }
        </div>
    )
}

export default AnecdoteList;