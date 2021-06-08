import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth } from "../firebase";
import { Card, Form, Container, Button } from "react-bootstrap";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
        console.log(error);
      });
  };
  return (
    <>
      {emailHasBeenSent && (
        <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
          An email has been sent to you!
        </div>
      )}
      <Container>
        <Card>
          <Card.Body>
            <h2>Reset Your Password</h2>
            <Form>
              <Form.Group>
                <Form.Label>
                  Type your email for sending reset password link
                </Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  value={email}
                  placeholder="Input your email"
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Button
                className="w-full bg-blue-400 text-white py-3"
                onClick={(e) => {
                  sendResetEmail(e);
                }}
              >
                Send me a reset link
              </Button>
            </Form>
            <Link
              to="/signin"
              className="my-2 text-blue-700 hover:text-blue-800 text-center block"
            >
              &larr; back to sign in page
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default PasswordReset;
