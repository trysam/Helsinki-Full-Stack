
import { useState, useEffect} from 'react'
import PersonForm from './personForm'
import Person from './person'
import Filter from './filter'
import server from './resource/node'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {server.getData().then(data => setPersons(data))},[])

  const alertMesaage = `${newName} is already added to phonebook, replace this number with the old one?`
  
  const inputName = (event) => {
    setNewName(event.target.value) 
  }
  
  const handleSearch = (event) => {
    setSearchWord(event.target.value) 
  }

  const inputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = searchWord 
                          ? persons.filter(person => 
                              person.name.toLowerCase().includes(searchWord.toLowerCase()))
                          : persons;

  const addPhonebook = (event) => {
    event.preventDefault();     
    const oldPerson = persons.filter(item => item.name.toLowerCase() === newName.toLowerCase())         
    oldPerson.length !== 0 
              ? window.confirm(alertMesaage)
              ? server.updateData({name:oldPerson[0].name, number:newNumber},oldPerson[0].id).then(
                data => setPersons(persons.reduce(
                (array,person) => person.id === oldPerson[0].id ? [...array , data] : [...array , person], [])))
              : alert('Cancelled')
              : server.addNewData({name:newName, number:newNumber}).then(
                  data => setPersons(persons.concat(data)));

    setNewName('');
    setNewNumber('') ;  
  } 
  
  const delPerson = (id) => {
    server.deleteData(id).then(
      setPersons(persons.filter(person => person.id !== id))
    )    
  }

  return (
    <div>
      <h2>Phonebook</h2>       
      <Filter handleSearch={handleSearch}/> 
      <h3>Add a new </h3>      
      <PersonForm newName={newName} newNumber={newNumber} inputName={inputName} 
        inputNumber={inputNumber} addPhonebook={addPhonebook} />
      <h3>Numbers</h3> 
      <Person filteredPersons={filteredPersons} delPerson={delPerson} />    
    </div>
  )
}

export default App