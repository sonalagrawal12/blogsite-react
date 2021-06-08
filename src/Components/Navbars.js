import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../providers/UserProvider";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
export default function Navbars() {
  const user = useContext(UserContext);
  return (
    <div>
      <Container>
        <Navbar bg="red" expand="lg">
          {user && <Navbar.Brand href="/posts">Post</Navbar.Brand>}
          {!user && <Navbar.Brand href="/posts">Post</Navbar.Brand>}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!user && <Nav.Link href="/signin">Sign In</Nav.Link>}
              {user && <Nav.Link href="/profilePage">Profile</Nav.Link>}
              {user && <Nav.Link href="/postItem">Create-Post</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
