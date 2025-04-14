import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json && json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
      navigate("/login");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Conditional styles based on mode
  const textColor = props.mode === "dark" ? "white" : "black";
  const buttonClass = props.mode === "dark" ? "btn btn-success" : "btn btn-primary";
  const inputStyle = {
    backgroundColor: "#7e7e7e6b",
    color: textColor,
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center" style={{ color: textColor }}>
        Login to continue to iNotebook
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label" style={{ color: textColor }}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
            style={inputStyle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color: textColor }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" className={buttonClass}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
