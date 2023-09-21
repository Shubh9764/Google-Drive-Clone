import React ,{useRef, useState} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthProvide";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";


const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error,setError] = useState('')
    const { signup } = useAuth()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit =  async (e) => {
        console.log("hi "+passwordRef.current.value + " " + passwordConfirmRef.current.value)
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Password do not match")
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            navigate("/login")
        }
        catch{
            setError("Failed to create Account")
        }
        setLoading(false)
    }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required/>
            </Form.Group>
            <Button disabled = {loading} className="w-100 mt-2" type="Submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have An Account? <Link to="/login">Log In</Link> 
      </div>
    </CenteredContainer>
  );
};

export default Signup;
