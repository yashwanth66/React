import Info from "./Info"
import About from "./About"
import Interests from "./Interests"
import Footer from "./Footer"

function App(){
    return (
        <div className = "top-container">
        <div className="main-container">
        <div className="container">
            <div className="box">
            <Info />
            <About />
            <Interests />
            </div>
            </div>
            <Footer />
        </div>
        </div>
    )
}

export default App