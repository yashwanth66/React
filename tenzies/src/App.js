import React from "react"
import "./App.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzie, setTenzie] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [leastRolls, setLeastRolls] = React.useState(0)
 
 
  React.useEffect(()=> {
    localStorage.setItem('leastRolls', JSON.stringify(leastRolls))
  }, [leastRolls])
  
  
   //const leastScore = localStorage.getItem('leastRolls')

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const value = dice[0].value
    const allSame = dice.every(die => die.value === value)
    if(allHeld){
      if(!allSame){
        alert("Please, check the dice")
      }
    }
    if(allHeld && allSame){
    setTenzie(true)
    setLeastRolls((leastRoll)=>{
      const least = parseInt((localStorage.getItem("leastRolls")))
      //console.log(typeof parseInt(least))
      if(least === 0){
        return rolls
      }else{
      return (rolls<least) ? rolls : least
      }
     })
    }
  },[dice,rolls])


  function generateNewDie() {
    return {
      value : Math.ceil(Math.random()*6 ), 
      isHeld: false,
      id: nanoid()
    }
  }
 
 
  function allNewDice(){
  const arr = []
  for(let i=0;i<10;i++){
    arr.push(generateNewDie())
  }
  return arr
}


  function rollDice(){
    if(!tenzie){
      setRolls(rolls+1)
      setDice(oldDice => oldDice.map(die => {
      return die.isHeld?
        die :
        generateNewDie()
    }))
    }else{
      setTenzie(false)
      setDice(allNewDice)
      setRolls(0)
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die =>{
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : 
      die
    }))
  }

  const diceValues = dice.map((val)=>{
    return <Die value={val.value} key = {val.id} isHeld = {val.isHeld} holdDice = {() => holdDice(val.id)}/>
  })
  const styles = {
    backgroundColor : tenzie ? "Green" : "red",
    color: tenzie ? "white" : "black"
  }

  return (
    <div className="container">
      <main className="main">
       {tenzie && <Confetti />}
        <div className="game-info">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click
          each die to freeze it at its current value between rolls.
        </p>
        </div>
        <div className="dice-container">
            {diceValues}
          </div>
          <button style={styles} onClick={rollDice}>{tenzie ? "New Game" : " Roll "}</button>
          <div className="score">
          <h4 className="rolls">Number of Rolls: {rolls}</h4>
          <h4 className="leastRolls">Least number of rolls: {leastRolls}</h4>
          </div>
      </main>
    </div>
  )
}