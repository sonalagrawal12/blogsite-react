import { Redirect } from "@reach/router";
import React, { useState, useContext } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { firestore } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import Navbar from "./Navbars";

export default function PostItem() {
  const [postTitle, setPostTitle] = useState("");
  const [postDetail, setPostDetail] = useState("");
  const [postAuthor, setPostAuthor] = useState("");
  const user = useContext(UserContext);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "postTitle") {
      setPostTitle(value);
    } else if (name === "postDetail") {
      setPostDetail(value);
    } else if (name === "postAuthor") {
      setPostAuthor(value);
    }
  };
  const handleAddPost = (event) => {
    event.preventDefault();
    console.log("user", user);
    if (user) {
      firestore
        .collection("posts")
        .add({
          postTitle: postTitle,
          postDetail: postDetail,
          postAuthor: postAuthor,
        })
        .then(async (docRef) => {
          const docid = docRef.id;
          const userRef = await firestore
            .collection("users")
            .doc(user.uid)
            .get();
          const user1 = userRef.data();
          user1.post.push(docid);
          // user.post.push(docid);
          firestore
            .collection("users")
            .doc(user.uid)
            .set(user1)
            .then(() => {
              console.log("no error");
            })
            .catch((error) => {
              console.log("error", error);
            });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      window.location.href = "/posts";
    }
    // <Redirect to="/" />;
  };
  return (
    <>
      <Navbar />
      <Container>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Create Post</h2>
            <Form onSubmit={(event) => handleAddPost(event)}>
              <Form.Group id="post-title">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text"
                  name="postTitle"
                  value={postTitle}
                  onChange={(event) => {
                    onChangeHandler(event);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group id="post-detail">
                <Form.Label>Post Details</Form.Label>
                <Form.Control
                  type="text"
                  name="postDetail"
                  value={postDetail}
                  onChange={(event) => {
                    onChangeHandler(event);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group id="text">
                <Form.Label>Post Author</Form.Label>
                <Form.Control
                  type="text"
                  name="postAuthor"
                  value={postAuthor}
                  onChange={(event) => {
                    onChangeHandler(event);
                  }}
                  required
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
