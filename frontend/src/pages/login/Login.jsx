import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
function Login() {
  const initialState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
      } else {
        alert(data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="johndoe"
          onChange={handleFormData}
          value={FormData.username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleFormData}
          value={FormData.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
