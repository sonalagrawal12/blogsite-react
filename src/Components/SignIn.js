import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle } from "../firebase";
import { Card, Form, Container, Button } from "react-bootstrap";
import Navbar from "./Navbars";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    const Ref = await auth.signInWithEmailAndPassword(email, password);
    window.location.href = "/posts";
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Card>
          <Card.Body>
            <h2>Sign In</h2>
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
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
                  signInWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                Sign In
              </Button>
            </Form>
            <p>{"      "}OR</p>
            <Button onClick={signInWithGoogle}>Sign In With Google</Button>
            <p className="text-center my-3">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-blue-500 hover:text-blue-600">
                Sign up here
              </Link>{" "}
              <br />{" "}
              <Link
                to="/passwordReset"
                className="text-blue-500 hover:text-blue-600"
              >
                Forgot Password?
              </Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
      {error !== null && (
        <div className="py-3 bg-red-600 w-full text-black text-center mb-3">
          {error}
        </div>
      )}
    </>
  );
};
export default SignIn;
