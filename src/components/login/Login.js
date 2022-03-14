import React, { useState } from "react";
import "./Login.css";
import img from "../images/loginImage.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <nav className="login__nav">
        <h3>FreeCo</h3>
      </nav>
      <div className="login__container">
        <div className="login__container-img">
          <img src={img} alt="illustration" />
        </div>
        <div className="login__container-form">
          <h3 className="login__formHeading">Textbook Solutions CMS</h3>
          <p className="login__formPara">May you have a Brainly day</p>
          <form onSubmit={handleSubmit} className="login__form">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="login__formInput"
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="login__formInput"
              type="password"
              placeholder="Password"
            />
            <button type="submit" className="login__formBtn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
