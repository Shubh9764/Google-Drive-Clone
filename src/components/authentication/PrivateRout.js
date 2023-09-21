import React, { Component } from 'react'
import { Navigate, Outlet, Route,redirect } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthProvide";

function PrivateRout ({children}){
    const {currentUser} = useAuth();
      return !currentUser ? <Navigate to="/login" replace />:
     <>
     {children}</>;
}

export default PrivateRout