import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from "./firebase-config";

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const {displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  const handleSignOut = () => {
    firebase.auth()
    .signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser)
    })
    .catch(err => {
      console.log(err)
    });
  }

  return (
    <div className="App">
      {
        user.isSignedIn 
        ? <button onClick={handleSignOut}>Sign Out</button> 
        : <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <h3>Welcome! {user.name}</h3>
          <h4>Email: {user.email}</h4>
          <img src={user.photo} alt=''></img>
        </div>
      }
    </div>
  );
}

export default App;
