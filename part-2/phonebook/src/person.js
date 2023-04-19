
const Person = ({filteredPersons, delPerson}) =>
    <div>{filteredPersons.map(person => {
          return(
            <div className="person" key={person.id}>
                {person.name} {`${person.number} `}
                <button onClick={() => delPerson(person.id)}>Delete</button>
            </div>
          )}
        )}           
    </div>      
export default Person;