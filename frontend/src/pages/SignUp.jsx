import SignUpImg from "../assets/loginsignup.jpg";
import { Form, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import app from "../api/axios-config";
import "./Signup.css";

const USERNAME_REGEX = /^[A-Za-z][a-zA-Z0-9-_]{3,23}$/;
const NAME_REGEX = /^[A-Za-z]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUp() {
  const usernameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [organization, setOrganization] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setError("");
  }, [username, firstName, lastName, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = Object.fromEntries(new FormData(e.target));
      const res = await app.post("/register", data);
      navigate("/login");
      console.log(data);
      setUsername("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Username already taken");
      } else if (err.response?.status === 401) {
        setError("Email already use");
      } else {
        setError("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="form-container">
      <img src={SignUpImg} alt="login background" />
      <section>
        <h1 className="form-title">Create Account</h1>
        <p ref={errRef} className={error ? "error" : "offscreen"}>
          {error}
        </p>
        <Form className='form-fields' method="post" onSubmit={handleSubmit}>
          <label htmlFor="username">
            *Username:
            <span className={validUsername ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validUsername || !username ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            ref={usernameRef}
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            aria-invalid={validUsername ? "false" : "true"}
            aria-describedby="usernote"
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />
          <p
            id="usernote"
            className={
              usernameFocus && username && !validUsername
                ? "instructions"
                : "offscreen"
            }
          >
            Must be 4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="firstname">
            *First Name:
            <span className={validFirstName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validFirstName || !firstName ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            name="first_name"
            id="firstname"
            autoComplete="off"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
            aria-invalid={validFirstName ? "false" : "true"}
            aria-describedby="fnamenote"
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
          />
          <p
            id="fnamenote"
            className={
              firstNameFocus && firstName && !validFirstName
                ? "instructions"
                : "offscreen"
            }
          >
            Only letters are allowed.
          </p>

          <label htmlFor="lastname">
            *Last Name:
            <span className={validLastName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validLastName || !lastName ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            name="last_name"
            id="lastname"
            autoComplete="off"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
            aria-invalid={validLastName ? "false" : "true"}
            aria-describedby="lnamenote"
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
          />
          <p
            id="lnamenote"
            className={
              lastNameFocus && lastName && !validLastName
                ? "instructions"
                : "offscreen"
            }
          >
            Only letters are allowed.
          </p>

          <label htmlFor="email">
            *Email:
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            Please enter a valid email.
          </p>

          <label htmlFor="organization">
            Organization Name: <br />
            <span>(Choose only if you're a member of an organization)</span>
            <select
              id="organization"
              name="organization_name"
              onChange={(e) => {
                setOrganization(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="PAWS">
                Philippine Animal Welfare Society (PAWS)
              </option>
              <option value="CARA">
                Compassion and Responsibility for Animals (CARA)
              </option>
              <option value="PETA">
                People for the Ethical Treatment of Animals (PETA)
              </option>
              <option value="AKF">Animal Kingdom Foundation (AKF)</option>
              <option value="PAWP">Pawssion Project</option>
              <option value="PART">Philippine Animal Rescue Team (PART)</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label htmlFor="password">
            *Password:
            <span className={validPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPassword || !password ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="passwordnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="passwordnote"
            className={
              passwordFocus && !validPassword ? "instructions" : "offscreen"
            }
          >
            Must be 7 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character !@#$%
          </p>

          <button className="submit-btn">Register</button>
          <p className="form-text">
            Already have an account?{" "}
            <Link to="/login" className="form-link">
              Sign in
            </Link>
          </p>
        </Form>
      </section>
    </div>
  );
}

export default SignUp;
