import React, { useState } from "react";
import {  Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvide";
import { Link, useNavigate} from "react-router-dom";
import CenteredContainer from "./authentication/CenteredContainer";

const Profile = () => {
    const [error,setError] = useState()
    const { logout ,currentUser} = useAuth()
    const navigate = useNavigate()

    const handleLogout = async (e) => {
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
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong>{currentUser ? currentUser.email : "NULL"}
          <Link to="/update-profile" className="btn btn-primary w-100 mt -3">
            Update Profile
          </Link>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </CenteredContainer>
  );
};

export default Profile;
