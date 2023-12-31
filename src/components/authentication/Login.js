import React ,{useRef, useState} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link ,useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvide";
import CenteredContainer from "./CenteredContainer";
const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error,setError] = useState('')
    const { login ,currentUser} = useAuth()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            navigate("/")
        }
        catch{
            setError("Failed to Sign In")
        }
        setLoading(false)
    }
  return (
    <CenteredContainer>
    <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {currentUser && currentUser.email}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Button disabled = {loading} className="w-100 mt-2" type="Submit">Log In</Button>
          </Form>
          <div className="w-100 text-center mt-2">
        <Link to="/forgot-password">Forgot Password?</Link> 
      </div>
          <div className="w-100 text-center mt-2">
        Don't have An Account? <Link to="/signup">Sign Up</Link> 
      </div>
        </Card.Body>
      </Card>
      </CenteredContainer>
  )
}

export default Login