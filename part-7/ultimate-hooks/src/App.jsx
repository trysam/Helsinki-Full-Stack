import { useState, useEffect } from 'react'
import routeService from './service/service'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
    setValue
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
 
  useEffect(
    () => {routeService.getAll(baseUrl).then(data => setResources(data))},
  [baseUrl])


  const create = async (resource) => {
    const response = routeService.create(baseUrl, resource, null)
    return response
  }

  const update = async (resource, id) => {
    const response = routeService.create(baseUrl, resource, id)
    return response
  }

  const service = {
    create,
    update,
    setResources
  }

  return [
    resources, service
  ]
}

const App = () => {
  const {['setValue']: resetContent, ...content} = useField('text')
  const {['setValue']: resetName, ...name} = useField('text')
  const {['setValue']: resetNumber, ...number} = useField('text')

  const [notes, noteService] = useResource('http://localhost:3001/api/notes')
  const [persons, personService] = useResource('http://localhost:3005/api/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    const newNote= noteService.create({ content: content.value })
    noteService.setResources(notes.concat(newNote))
    resetContent('')
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const newPerson = await personService.create({ name: name.value, number: number.value})
    personService.setResources(persons.concat(newPerson))
    resetName('')
    resetNumber('') 
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App