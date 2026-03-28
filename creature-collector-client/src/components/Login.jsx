import React, { useState } from "react";
import { apiRequest } from "../api/api";
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    if (result.message === "Login successful") {
      onLogin();
    } else {
      alert(result.error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}
export default Login;
