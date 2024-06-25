import React from "react"
import './App.css';

export default function App() {
  const [formContent, setFormContent] = React.useState({
    email: "",
    password: "",
    confirmPassword : "",
    isInterested: false
  })
  function handleChange(event){
    const {name,value,type,checked} = event.target
    setFormContent((prevFormData)=>({
      ...prevFormData,
      [name] : type === "checkbox" ? checked : value
    }))
  }
  function handleSubmit(event){
    event.preventDefault()

    
    if(formContent.password !== formContent.confirmPassword){
      alert("Password Mismatch!!!")
      setFormContent(prevData =>({
        ...prevData,
        password : "",
        confirmPassword: ""
      }))
      
      
    }else{
      alert("Horray!!! Account created succefully")
    }
  }
  //  console.log(submittedData)
  return (
    <div className="form--container">
      <form onSubmit={handleSubmit}>
        <input 
        type= "email" 
        name="email"
        placeholder="mail"
        onChange={handleChange}
        value= {formContent.email}
        />
        <input
        type = "password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value= {formContent.password}
        />
        <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        onChange={handleChange}
        value= {formContent.confirmPassword}

        />
        
        <label htmlFor="isInterested"><input 
        type="checkbox"
        id="isInterested"
        onChange={handleChange}
        checked = {formContent.isInterested}
        name="isInterested"
        /> I want to join the newsletter</label>

        <button>Sign up</button>

      </form>
    </div>
  )
}