import React, { useEffect, useState } from "react";
import { firestore, auth } from "../firebase";
import Navbar from "./Navbars";
import { Container } from "react-bootstrap";

export default function Posts() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        setPost(querySnapshot.docs);
        console.log("querydocs", posts);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  const edithandler = (event) => {
    event.preventDefault();
  };
  const deletehandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <Container>
        {posts.map((post) => (
          <Container>
            {console.log("uid", post)}
            <h3>{post.data().postTitle}</h3>
            <h3>{post.data().postDetail}</h3>
            <h3>{post.data().postAuthor}</h3>
            <button
              onClick={(event) => {
                edithandler(event);
              }}
            >
              Edit Post
            </button>
            <button
              onClick={(event) => {
                deletehandler(event);
              }}
            >
              Delete Post
            </button>
          </Container>
        ))}
      </Container>
    </>
  );
}
