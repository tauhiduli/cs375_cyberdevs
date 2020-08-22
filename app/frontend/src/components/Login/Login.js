import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateFormContents() {
    return email.length > 0 && password.length > 0;
  }

  function submitForm(event) {
    event.preventDefault();
    fetch("/auth", {
    	method: "POST",
    	headers: {
    		"Content-Type": "application/json"
    	},
    	body: JSON.stringify({
    		email: email,
    		password: password,
    	})
    }).then(function(response) {
    	if (response.status === 200) {
    		console.log("Success");
    	}
    	else {
    		console.log("Failure");
    	}
    })
  }

  return (
    <div className="Login">
      <form onSubmit={submitForm}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateFormContents()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}