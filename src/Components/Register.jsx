import React ,{useState} from 'react'
import {Form , Button} from 'react-bootstrap'
import {Alert } from '@material-ui/lab'
import {useHistory} from 'react-router-dom'


function Register() {

  let history = useHistory()

  const handleOnSubmit = async (event) => {
    
    setLoading(true)
    event.preventDefault()
    if(data.name.length > 15 || data.name.length < 4 ){
      setAlert({display : true , message : "Username minimum 4 characters and maximum 15 characters" , severity : "error" })
      setLoading(false)
      return
    }
    if(data.password.length > 15 || data.password.length < 4 ){
      setAlert({display : true , message : "Password minimum 4 characters and maximum 15 characters" , severity : "error" })
      setLoading(false)
      return
    }

    try {
    var user = await fetch("https://pizza-planet-server.herokuapp.com/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth" : localStorage.getItem('pizzaPlanet')
      },
      body : JSON.stringify(data)
    }).then((res) => res.json())
    if(user.message === "success"){
      setLoading(false)
      setData( {name : "" , email : '' , password : "" , access : ""} )
      setAlert({display : true , message : "Registered successfully"  , severity : "success" })
      // sent to login
      setTimeout(()=>history.push('/login'),600)
      
    }
    else{
      
      setLoading(false)
      setAlert({display : true , message : user.message , severity : "error" })
    }
  }
  catch(err) {
    setAlert({display : true , message : err.message , severity : "error" })
  }
  }

  const handleOnChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    var temp = JSON.parse(JSON.stringify(data))
    temp[prop] = value;
    setData(temp)
   
  }

  const [data, setData] = useState({name : "" , email : '' , password : ""  })
  const [loading , setLoading ] = useState(false)
  const [alert , setAlert ] = useState({display : false , message : ""  , severity : "error" })

    return (
        <div> 
           { alert.display ?  <Alert severity={alert.severity} onClose={() => { setAlert( {display : false} ) }} >{alert.message}</Alert> : <></> }
            <Form onSubmit={handleOnSubmit}>
            <Form.Group controlId="formBasicText">
    <Form.Label>Full Name</Form.Label>
    <Form.Control type="text" placeholder="Enter full name" onChange={handleOnChange} value={data.name} name="name" />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={handleOnChange} value={data.email} name="email" required />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={handleOnChange} value={data.password} name="password" />
  </Form.Group>
  
  <Button type="submit" disabled={loading}>{loading ? "Please Wait" : "Register"}</Button>
 
</Form>
        </div>
    )
}



export default Register
