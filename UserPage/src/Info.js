import image from "./pawan.jpg"
export default function Info(){
    return (
        <div className="info-items">
            <img src={image} />
            <h3 className = "info-heading">Agu Pavan Kumar</h3>
            <h4 className = "info-subheading">Software Developer</h4>
            <p className = "info-location">Hyderabad, Telangana</p>
            <div className = "info-buttons">
                <button className = "email-button" >Email</button>
                <button className = "linkedin-button">Linkedin</button>
            </div>
        </div>
    )
}