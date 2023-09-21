import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthProvide'
import CenteredContainer from "./CenteredContainer";
const ForgotPassword = () => {
    const emailRef = useRef()
    const [error,setError] = useState('')
    const { resetPassword ,currentUser} = useAuth()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
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
          <h2 className="text-center mb-4">Password Reset</h2>
          {currentUser && currentUser.email}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled = {loading} className="w-100 mt-2" type="Submit">Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-2">
        <Link to="/login">Log In</Link> 
        </div>
        </Card.Body>
      </Card>
      </CenteredContainer>
  )
}

export default ForgotPassword