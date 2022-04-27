import axios from "../../Axios";
import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { MYContext } from "../../context";
import { useHistory } from "react-router-dom";
import "./signup.css";

function Signup() {
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(MYContext);
  const history = useHistory();

  function handleSignup(e) {
    e.preventDefault();
    if (!name ||!email || !password) {
      return alert("please fill the missing field");
    }
    axios
      .post("/users", { name,email, password })
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("token", data.token);
        history.replace("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="login-container">
        <h1>theMealDb</h1>
        <h3>Register</h3>
        <div className="login-inner-container">
          <Container>
            <Row>
              <Col sm={12} md={12}>
        <Form onSubmit={handleSignup} autocomplete="off">
          
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Your UserNmae"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Register</Button>
        </Form>
        </Col>
             </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Signup;
