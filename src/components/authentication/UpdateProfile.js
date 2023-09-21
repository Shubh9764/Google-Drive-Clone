import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthProvide";
import CenteredContainer from "./CenteredContainer";

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error,setError] = useState('')
    const { changeEmail,changePassword ,currentUser} = useAuth()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

   
    const handleSubmit =  (e) => {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Password do not match")
        }
        try{
          const promises = [] 
          setError('')
          setLoading(true)
        
          if(emailRef.current.value !== currentUser.email){
            console.log("email :"+emailRef.current.value)
            promises.push(changeEmail(emailRef.current.value))
            //  updateEmail(emailRef.current.value)
            console.log("success")
          }
          if(passwordRef.current.value){
            console.log("password :"+passwordRef.current.value)
            promises.push(changePassword(passwordRef.current.value))
            console.log("done")
          }
          Promise.all(promises).then(() => {
            navigate("/user")
          }).catch(() => {
            setError("Failed to Update Promise Account")
          })
        }
        catch{
            setError("Failed to Update Account")
        }
        setLoading(false)
    }
  return (
    <CenteredContainer>
    <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {currentUser && currentUser.email}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} 
                placeholder='leave blank to keep the same'/>
            </Form.Group>
            <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef}/>
            </Form.Group>
            <Button disabled = {loading} className="w-100 mt-2" type="Submit">Update</Button>
          </Form>
          <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link> 
      </div>
        </Card.Body>
      </Card>
      </CenteredContainer>
  )
}

export default UpdateProfile