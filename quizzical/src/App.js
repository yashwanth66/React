import React from "react"
import "./App.css"
import Quiz from "./components/Quiz.js"
import { Link } from "react-router-dom"

function App(){
 
  return (
    <div className="container">
        <div className="app-info">
            <h1>Quizzical</h1>
            <p>Get ready for the Quiz...</p>
            <div className="start-button"><Link to='home'>Start Quiz</Link></div>
        </div>

    </div>
  )
}


export default App