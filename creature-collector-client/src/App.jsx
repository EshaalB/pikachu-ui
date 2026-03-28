import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  if (userLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <img
          src="/pikachu.png"
          alt="Pikachu"
          className="auth-card-pika"
        />
        {showLogin ? (
          <Login onLogin={() => setUserLoggedIn(true)} />
        ) : (
          <Register onRegisterSuccess={() => setShowLogin(true)} />
        )}
        <button className="toggle-btn" onClick={() => setShowLogin(!showLogin)}>
          {showLogin
            ? "Need an account? Sign Up Here"
            : "Already have an account? Login Here"}
        </button>
      </div>
    </div>
  );
}

export default App;
