import "./register.css"
import {Room, Cancel }from '@material-ui/icons';
import React, { Component, useEffect, useState, useRef } from 'react'
import App from '../App.js'
import {Navigate } from "react-router-dom"

let baseURL = ""

if(process.env.NODE_ENV === "development"){
  baseURL = "http://localhost:3001"
} else {
  baseURL = `${process.env.REACT_APP_BACKEND_URL}/pins`
}
console.log("Current base URL: ", baseURL)




class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      success:false,
      setSuccess:false,
      error: false,
      setError: false,
      navigate: true,
      user: false,
   
      
    }
    
  
  }
  getPins = () => {
		fetch(baseURL + '/pins')
			.then(res => {
				if(res.status === 200) {
					return res.json()
				} else {
					return []
				}
			}).then(data => {
				console.log('data', data)
				this.setState({pins: data.pins})
			})
	}

 

  handleRegister = (e) => {
    e.preventDefault()
    console.log("etarget", e.target)
    fetch(baseURL + '/users/register', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(resJson => {
      console.log(resJson)
      this.getPins()
      this.setState({
        user: true
      })

      
      
      
    })
  }
  

  render() {
    return (
      
      // <div className="registerContainer">
      //   <div className="logo">AS
      //   <Room />
      //   Travel Pins
      //   </div>
      
      <div>
         {this.state.user && (<Navigate to ="/map" />) }
        <h1 className="h1-register">CREATE AN ACCOUNT</h1>
        <form  onSubmit={this.handleRegister}  action="/map" >
          <label className="label1" htmlFor="name">Username: </label>
          <input id="username" name="username" className="username" type="text" placeholder="username" />
          <label className="label1" htmlFor="name">Email: </label>
          <input  id="email" name="email" className="email" type="email" placeholder="email" />
          <label className="" htmlFor="name">Password: </label>
          <input id="password" name="password" className="password" type="password" placeholder="password" />
          <input className="registerButton" type="submit" value="Register" />
         
        </form>
        {/* <Cancel
        className="registerCancel"
        onClick={this.props.closeRegisterPopup}
        /> */}
      </div>
    )
  }
}

export default Register
