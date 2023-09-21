import React ,{useRef, useState} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthProvide";
import { useNavigate} from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
const Logout = () => {
    const [error,setError] = useState('')
    const { logout ,currentUser} = useAuth()
  const navigate = useNavigate()


    const handleSubmit =  async (e) => {
        e.preventDefault()
        try{
            setError('')
            await logout()
            navigate('/login')
    
        }
        catch{
            setError("Failed to Sign In")
        }
    }
  return (
    <CenteredContainer>
    <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {currentUser && currentUser.email}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Button className="w-100 mt-2" type="Submit">Log Out</Button>
          </Form>
        </Card.Body>
      </Card>
      </CenteredContainer>
  )
}

export default Logout