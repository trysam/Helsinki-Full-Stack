const InputCountry = ({handleSearch}) => {
    return <div>
        <label htmlFor="searchCountry"> Search Country </label>
        <input type="text" placeholder="Country" onChange={handleSearch} id="searchCountry" /> 
    </div>
}

export default InputCountry