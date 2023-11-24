/* eslint-disable react/prop-types */
import { useField, useResource } from "../hooks/hooks"

const Person = ({setMessage}) => {
    const {['reset']: resetName, ...nameField} = useField()
    const {['reset']: resetNumber, ...numberField} = useField()
  
    const [persons, personService] = useResource('http://localhost:3005/api/persons')
  
    const handlePersonSubmit = async (event) => {
      event.preventDefault()


    try{
      const newPerson = await personService.create({ name: nameField.value, number: numberField.value})
      personService.setResources(persons.concat(newPerson))
      resetName('')
      resetNumber('')
      setMessage(`${newPerson.name} added`)
      setTimeout(() => setMessage(null), 5000)
    }catch(exemption){
      setMessage(`${exemption.message} added`)
      setTimeout(() => setMessage(null), 5000)
    }
  }
  
    return(
      <div>
          <h2>persons</h2>
          <form onSubmit={handlePersonSubmit}>
            name <input {...nameField} /> <br/>
            number <input {...numberField} />
            <button>create</button>
          </form>
          {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  
   
    )
  }
  
  export default Person