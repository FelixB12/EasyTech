import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="Home">Easy Tech</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="Home">Home</Nav.Link>
            {/* <Nav.Link href="Weather">Weather</Nav.Link> */}
            <Nav.Link href="Portfolio">Portfolio</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="SignUp">Register</Nav.Link>
            <Nav.Link href="SignIn">Log In</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
