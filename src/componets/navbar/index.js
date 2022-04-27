import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MYContext } from "../../context";
import axios from "../../Axios";
import { useHistory } from "react-router-dom";
import "./nav.css";
import logo from "./chef.png";

function AppNavbar() {
  const history = useHistory();
  const { user, setUser } = useContext(MYContext);

  function handleLogout() {
    axios.post("/logout").then((res) => {
      localStorage.removeItem("token");
      setUser(null);
      history.replace("/");
    });
  }
  return (
    <Navbar expand="lg" sticky="top" bg="black" variant="dark" >
      <Container>
        <Navbar.Brand>
          <img src={logo} width="60" height="60" alt="Recipe logo" />
        </Navbar.Brand>
        <Navbar.Brand>TheMealDB🤤</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
            {user && (
              <>
               <LinkContainer to="/my-favorites">
                  <Nav.Link>Favorites</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && 
      <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
     <span className="font-weight-bold">{user.email}</span> 🤤
    </Navbar.Text>
  </Navbar.Collapse>
}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
