import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../../assets/images/crud-logo.png'

const AppNavBar = () => {
  return (
    <div>
      <Navbar className="navbar" bg="light" expand="lg">
        <Container className=" ms-11">
          <Navbar.Brand><img className="nav-logo" src={logo}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><NavLink to="/" className="navlink">Product List</NavLink></Nav.Link>
              <Nav.Link><NavLink to="/create" className="navlink">Create Product</NavLink></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
