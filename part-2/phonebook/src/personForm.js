

const PersonForm = ({newName, newNumber, inputName, inputNumber, addPhonebook}) => {
    return (
        <form onSubmit={addPhonebook}>           
            <div>
              name: <input value={newName} onChange={inputName} placeholder={"Surname FirstName"} />          
            </div>
            <div>
              number: <input required={true} value={newNumber} onChange={inputNumber} placeholder={"e.g 234-000000000"} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>                
    )
}

export default PersonForm;