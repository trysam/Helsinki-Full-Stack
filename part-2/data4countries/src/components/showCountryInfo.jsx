const ShowCountryInfo = ({country, searchCountry, handleClick}) => {     
    const filteredCountry = country
        ? searchCountry.length > 10
        ? 'Too Many Matches, specify another filter' 
        : searchCountry.length === 1
        ? searchCountry.map(country => {        
            return <div key={country.ccn3}>
                        <h2>{country.name.common}</h2>
                        <div>Capital: {country.capital}</div>
                        <div>Area: {country.area}</div>
                        <h3>Languages</h3>
                        <ul>{
                            Object.keys(country.languages).map((key,index) => 
                                <li key={index}>{country.languages[key]}</li>)                      
                            }
                        </ul>
                        <div>
                            <img src={country.flags.png} alt={country.flags.alt}/>                    
                        </div>                               
                    </div>
        })
        : searchCountry.map(country => 
            <div key={country.ccn3}>{country.name.common}  
                <button type="button" value={country.name.common} onClick={handleClick}>View</button>
            </div>
        ) 
        : null  

  return <div>{filteredCountry}</div>

}

export default ShowCountryInfo;