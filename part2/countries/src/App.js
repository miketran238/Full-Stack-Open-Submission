import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Body of the Component being executed
//Render the first time: 'render 0 notes'
//Effect takes place
//Fetch data from the server. Update notes
//Re-render: 'render 3 notes'
const api_key = process.env.REACT_APP_API_KEY
console.log(api_key)
const FilterCountries =({nameFilter, handleNewFilter}) => {
  return (
    <>
    <h1>Countries</h1>
    <div>
      Filter by name 
      <input value={nameFilter} onChange={handleNewFilter} />
    </div>
    </>
  )
}

const DisplayCountries =({countries,handleSelect }) => {
  if ( countries.length > 10 ) {
    return (
      <div>
        <p> Too many matches, please specify another filter</p>
      </div>
    )
  } else if ( countries.length > 1 ) {
    return (
      <div>
        <ul>
        {countries.map(country => (
          <li key={country.name}> {country.name} 
          <button onClick={() => handleSelect(country.name)}>show</button>
          </li>
        ))}
        </ul>
      </div>
    )
  } else if ( countries.length === 1 ) {
    return (
      <Country country={countries[0]} />
    )
  } else {
    return (
      <div>
        <p> No matches, please specify another filter</p>
      </div>
    )
  }
}

const Country = ({country}) => {
  return (
    <div>
    <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
    <h2> Languages: </h2>
    <ul>
    {country.languages.map(language => (
      <li key={language.name}>{language.name} </li>
    ))}
    </ul>
    <img src={country.flag} alt={country.name} height="100"></img>
    <Weather city={country.capital} />
    </div>
  )
}

const Weather =({city}) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    fetch(
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
    )
      .then(response => response.json())
      .then(data => {
        setWeather(data.current)
      })
  }, [city])
  if (weather) {
    return (
      <div>
      <h2> Weather in {city}</h2>
        <b>temperature : </b> {weather.temperature} Celsius <br />
        <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} height="100" /> <br />
        <b> wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    )
  } else {
    return (
      <></>
    )
  }
  
}
const App = () => {
  const [countries, setCountries] = useState([]) 
  const [ nameFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  // console.log('render', countries.length, 'countries')
  // console.log(countries)

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleSelect = newFilter => {
    setNewFilter(newFilter)
  }

  const countriesToShow = nameFilter === ''
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>

      <FilterCountries nameFilter={nameFilter} handleNewFilter={handleNewFilter} />
      <DisplayCountries countries={countriesToShow} handleSelect={handleSelect} />
      </div>
  )
}

export default App 