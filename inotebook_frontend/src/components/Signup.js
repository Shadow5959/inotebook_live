import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  let host = process.env.REACT_APP_HOST;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        cpassword: credentials.cpassword,
      }),
    });
    const json = await response.json();

    if (json && json.success) {
      // Store token securely in an httpOnly cookie on the server-side
      document.cookie = `token=${json.authToken}; path=/; secure; samesite=strict`;
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
      navigate("/signup");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Styling logic
  const textColor = props.mode === "dark" ? "white" : "black";
  const buttonClass = props.mode === "dark" ? "btn btn-success" : "btn btn-primary";
  const inputStyle = {
    backgroundColor: "#7e7e7e6b",
    color: textColor,
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center" style={{ color: textColor }}>
        Sign Up to continue to iNotebook
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label" style={{ color: textColor }}>
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ color: textColor }}>
            Email address
          </label>
          <input
            name="email"
            value={credentials.email}
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color: textColor }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            minLength={5}
            maxLength={32}
            pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{5,}"
            title="Password must include at least one uppercase letter, one special character, and be between 5-32 characters long."
            required
            style={inputStyle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label" style={{ color: textColor }}>
            Confirm Password
          </label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" className={buttonClass}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
