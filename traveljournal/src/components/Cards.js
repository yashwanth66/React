export default function Cards(props){
    return (
        <div className="cards">
            <img src={props.img} className="loc--img"/>
            <div className="visitor">{props.visitor}</div>
            <div className = "cards--info">
                <div className="location">
                <img src="../images/location.jpg" className="mark--img" />
                <h4>{props.city}</h4>
                </div>                
                <h1>{props.location}</h1>
                <h5>{props.date}</h5>
                <p>{props.description}</p>
                
            </div>
            
        </div>
        
    )
}