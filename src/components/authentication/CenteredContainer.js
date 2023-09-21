import React from 'react'
import { Container } from 'react-bootstrap'

const CenteredContainer = ({children}) => {
  return (
    <Container
    className="d-flex justify-content-center  align-items-center"
    style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{maxWidth: "400px"}}>
            {children}
        </div>
  </Container>
  )
}

export default CenteredContainer