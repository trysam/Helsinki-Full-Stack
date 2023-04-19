const Filter = ({handleSearch}) => {
    return (
        <div>
            filter shown with <input onChange={handleSearch} placeholder='search name'/>
        </div>
    )
}

export default Filter;