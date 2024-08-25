import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import './SignIn.css';

const SignIn = ({ setUser }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => setUser(result.user))
      .catch(error => console.error(error));
  };

  return (
    <button className="signin-button" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default SignIn;

