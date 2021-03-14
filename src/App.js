import React, { useState } from 'react'
import './App.css';

function App() {
  const apiUrl = "http://localhost:5000/"
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState()
  const [filename, setFilename] = useState()
  const [count, setCount] = useState()

  const generateFunc = async() => {
    console.log('Generated')
    setIsError(false)
    setIsLoading(true)
    setUrl()
    setFilename()
    setCount()
    fetch(
      `${apiUrl}`, 
      {
        method: 'POST'
      }
    )
    .then(
      response => response.json()
    )
    .then(
      data => {
        setFilename(data.filename)
        setUrl(data.url)
        setIsLoading(false)
      }
    )
    .catch(
      error => {
        setIsError(true)
        setErrorMessage(error.message)
        setIsLoading(false)
      }
    )
  }

  const getData = async() => {
    console.log('Get Data')
    setIsError(false)
    setIsLoading(true)
    setCount()
    fetch(
      `${apiUrl}/${filename}`, 
      {
        method: 'GET'
      }
    )
    .then(
      response => response.json()
    )
    .then(
      data => {
        setCount(data.count)
        setIsLoading(false)
      }
    )
    .catch(
      error => {
        setErrorMessage(error.message)
        setIsError(true)
        setIsLoading(false)
      }
    )
  }

  return (
    <div className="App">
      <div className="row">
        Sample React Js App
      </div>
      <div className="container">
        {
          isLoading &&
          <div className="row">
            <b>
              Please wait the application is loading....
            </b>
          </div>
        }
        {
          isError &&
          <div className="row">
            <b>
              {errorMessage}
            </b>
          </div>
        }
        <div className="row">
          <button
            className="button default"
            onClick={() => generateFunc()}
            disabled={isLoading}
          >
            Generate
          </button>
        </div>
        <div className="row">
          {
            url &&
            <a
              href={url}
            >
              Download Link
            </a>
          }
        </div>
        {
          filename &&
          <div className="row">
            <button
              className="button report"
              onClick={() => getData()}
              disabled={isLoading}
            >
              Report
            </button>
          </div>
        }
        {
          count &&
          <div className="row">
            Alphabetical String: {count.alphabets || 'N/A'}
          </div>
        }
        {
          count &&
          <div className="row">
            Real Numbers: {count.real_numbers || 'N/A'}
          </div>
        }
        {
          count &&
          <div className="row">
            Integers: {count.integers || 'N/A'}
          </div>
        }
        {
          count &&
          <div className="row">
            Alphanumerics: {count.alpha_numerics || 'N/A'}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
