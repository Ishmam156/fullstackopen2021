import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => {
  // Check if weather is in initial state
  if (weather.empty) {
    return (
      <p><em>Loading weather data</em></p>
    )
  } else {
    return (
      <>
        <p><strong>temperature</strong> {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons} alt='weather icon' style={{ width: '5%' }} />
        <p><strong>wind</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </>
    )
  }
}

const SingleCountry = ({ country, weather, setWeather }) => {

  // Converting numbers to thousand - taken from - https://blog.abelotech.com/posts/number-currency-formatting-javascript/
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  // Getting weather data
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => setWeather(response.data))
  }, [country.capital, setWeather])

  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {formatNumber(country.population)}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <h2>Flag</h2>
      <img src={country.flag} alt='country flag' style={{ width: '10%' }} />
      <h2>Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </>
  )
}

const MultipleCountry = ({ country, changeCountry }) => {
  return (
    <>
      <p>{country.name} <button onClick={() => changeCountry([country])}>Show</button></p>
    </>
  )
}

const SearchCountries = ({ countries, changeCountry, weather, setWeather }) => {

  // If statements to check for search result length
  if (countries.length === 1) {
    return (
      <>
        <SingleCountry country={countries[0]} weather={weather} setWeather={setWeather} />
      </>
    )
  } else if (countries.length > 1 && countries.length < 11) {
    return (
      <>
        {countries.map(country =>
          <MultipleCountry key={country.name} country={country} changeCountry={changeCountry} />
        )}
      </>
    )
  } else {
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  }
}

const App = () => {
  // Declaring consts
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState([])
  const [weather, setWeather] = useState({ 'empty': true })

  // Fetching data from API and setting it to countries
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Handling search and factoring showAll accordingly.
  const handleSearch = (event) => {
    // Handling change of search
    setNewSearch(event.target.value)
    setWeather({ 'empty': true })

    // Changing showing countries based on search
    setShowAll(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <>
      find countries <input onChange={handleSearch} value={newSearch} />
      <br />
      <SearchCountries countries={showAll} changeCountry={setShowAll} weather={weather} setWeather={setWeather} />
    </>
  )
}

export default App