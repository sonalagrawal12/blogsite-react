import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument, signInWithGoogle } from "../firebase";
import { Card, Form, Container, Button } from "react-bootstrap";
import Navbar from "./Navbars";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }
    window.location.href = "/posts";
    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const onChangeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <Card>
          <Card.Body>
            <h2>Sign Up</h2>
            <Form>
              <Form.Group id="displayName">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  type="text"
                  name="displayName"
                  value={displayName}
                  placeholder="Type your name here"
                  onChange={(event) => onChangeHandler(event)}
                  required
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  placeholder="Type your email here"
                  value={email}
                  onChange={(event) => onChangeHandler(event)}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="userPassword"
                  value={password}
                  placeholder="Type password"
                  onChange={(event) => onChangeHandler(event)}
                  required
                />
              </Form.Group>
              <Button
                onClick={(event) => {
                  createUserWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                Sign Up
              </Button>
            </Form>
            <p>OR</p>
            <Button onClick={signInWithGoogle}>Sign Up With Google</Button>
            <p className="text-center my-3">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500 hover:text-blue-600">
                Sign in here{" "}
              </Link>{" "}
            </p>
          </Card.Body>
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-black text-center mb-3">
              {error}
            </div>
          )}
        </Card>
      </Container>
    </>
  );
};
export default SignUp;
