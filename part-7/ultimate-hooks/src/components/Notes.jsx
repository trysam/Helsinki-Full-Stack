import { useField, useResource } from "../hooks/hooks"

// eslint-disable-next-line react/prop-types
const Note = ({setMessage}) => {
    const {['reset']: resetContent, ...contentField} = useField()
    const [notes, noteService] = useResource('http://localhost:3001/api/notes')
  
    const handleNoteSubmit = async (event) => {
      event.preventDefault()
      try{
        const newNote= await noteService.create({ content: contentField.value })
        noteService.setResources(notes.concat(newNote))
        resetContent('')
        setMessage(`${newNote.content} added`)
        setTimeout(() => setMessage(null), 5000)
      }catch(exemption){
        console.log(exemption.data.error)
        setMessage(`${exemption.message} added`)
        setTimeout(() => setMessage(null), 5000)
      }
    }
  
    return (
      <div>
          <h2>notes</h2>
          <form onSubmit={handleNoteSubmit}>
            <input {...contentField} />
            <button>create</button>
          </form>
          {notes.map(n => <p key={n.id}>{n.content}</p>)}
      </div>
    )
  }

  export default Note
  