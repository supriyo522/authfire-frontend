import React, { useState } from 'react';
import SignIn from './components/SignIn';
import CommentInput from './components/CommentInput';
import CommentsList from './components/CommentsList';
import LogoutButton from './components/LogoutButton';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {!user ? (
        <SignIn setUser={setUser} />
      ) : (
        <div className="app-content">
          <LogoutButton setUser={setUser} />
          <CommentInput user={user} />
          <CommentsList />
        </div>
      )}
    </div>
  );
};

export default App;



