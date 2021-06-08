import React from "react";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDG7Vn5rH-E1geg92v65I1YFb98-kGNry8",
  authDomain: "blogsite-314413.firebaseapp.com",
  projectId: "blogsite-314413",
  storageBucket: "blogsite-314413.appspot.com",
  messagingSenderId: "877570590932",
  appId: "1:877570590932:web:edeb7fa09a950b74bc1341",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const post = [];
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then(() => {
    window.location.href = "/posts";
  });
};
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    const post = [];
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        post,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
