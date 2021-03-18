import React from "react"
import { createGlobalStyle } from 'styled-components'
import Router from './routes/Router'

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;

  }

  input {
    min-width: 200px;
    min-height: 30px;
    font-size: 16px;
    margin-bottom: 10px;
    padding: 5px;
  }

  button {
    min-width: 120px;
    height: 40px;
    margin: 10px 10px 0 10px;
    border-radius: 10px;
    font-size: 16px;
    border-color: transparent;
    background-color: #417380;
    color: white;
    padding: 0 15px;
  }

  b {
    color: #417380;
  }

  p {
    margin: 0;
    padding: 5px 0;
    font-size: 16px;
  }

  h1 {
    margin: 0;
    padding: 0 0 15px 0;
    text-align: center;
    color: #417380;
    font-size: 34px;
  }

  h2 {
    margin: 0;
    padding: 0 0 10px 0;
    text-align: center;
    color: #417380;
    font-size: 28px;
  }

  h3 {
    margin: 0;
    padding: 0 0 10px 0;
    color: #417380;
    font-size: 22px;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  )
}

export default App
