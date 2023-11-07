import { useQueryClient, useMutation } from "@tanstack/react-query"
import anecdoteService from "../service/anecdoteService";
import { useContext } from "react";
import NotificationContext from "./notificationContext";

const AnecdoteForm = () => {
  
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient();

  const anecdoteMutation = useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotesInState = queryClient.getQueryData()
      queryClient.setQueryData(['anecdote'], anecdotesInState.concat(newAnecdote))
      dispatch({type:'NEW_NOTE', payload:newAnecdote.content})
      setTimeout(() => dispatch({type:"RESET"}), 5000)
    },
    onError: (error) => {
      dispatch({type:'ERROR', payload:error.response.data.error})
      setTimeout(() => dispatch({type:"RESET"}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({content, votes:0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
