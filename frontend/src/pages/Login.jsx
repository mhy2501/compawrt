import SignUpImg from "../assets/loginsignup.jpg";
import { useState, useRef, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import app from "../api/axios-config";
import "./Signup.css";

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [username, password]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = Object.fromEntries(new FormData(e.target));
      const res = await app.post("/login", data);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      app.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
      window.location.href = "/dashboard";
      setUsername("");
      setPassword("");
      
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("User does not exist");
      } else if (err.response?.status === 401) {
        setError("Username or password is incorrect");
      } else {
        setError("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="form-container">
      <img src={SignUpImg} alt="login background" />
      <section>
        <h1 className="form-title">Log In</h1>
        <p
          ref={errRef}
          className={error ? "error" : "offscreen"}
          aria-live="assertive"
        >
          {error}
        </p>
        <Form className="form-fields" method="post" onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="submit-btn">Sign In</button>
        </Form>
        <p className="form-text">
          Don't have an account?{" "}
          <Link to="/signup" className="form-link">
            Create account
          </Link>
        </p>
      </section>
    </div>
  );
}

export default Login;
