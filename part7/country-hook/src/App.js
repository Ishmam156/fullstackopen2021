import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Custom Hook for getting input
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook for Country info
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        setCountry({ 
              data : response.data[0],
              found : true
            })
      } catch (error) {
        setCountry(name)
      }
    }
    
    getData()
    
  }, [name])
  
  return country
}

// Country component
const Country = ({ country }) => {
  if (!country) {
    return null
  }
  
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

// Main App Compoment
const App = () => {
  // Get input from user
  const nameInput = useField('text')
  // Country name variable
  const [name, setName] = useState('')
  const country = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
