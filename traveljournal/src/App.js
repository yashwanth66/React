import "./App.css"
import Header from "./components/Header"
import Cards from "./components/Cards"
import data from "./data"
export default function App(){

  const cards = data.map(item =>{
    return (
      <Cards 
        key = {item.id}
        img = {item.img}
        location = {item.location}
        visitor = {item.visitor}
        date = {item.date}
        city = {item.city}
        description = {item.description}
      />
    )
  })

  return (
    <div className="main">
    <div className = "container">
      <Header />
      {cards}
    </div>
    </div>
    
  )
}