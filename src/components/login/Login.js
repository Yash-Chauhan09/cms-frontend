import React, { useState } from "react";
import "./Login.css";
import img from "../images/loginImage.svg";
import axios from "axios";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let content = {
      email: email,
      password: password,
    };
    axios({
      method: "post",
      url: "https://freecoedu-cms.herokuapp.com/auth/signin",
      data: content,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.data.accessToken) {
          dispatch({
            type: actionTypes.SET_USER,
            user: res.data.email,
            userRole: res.data.role,
            accesstoken: res.data.accessToken,
            resetToken: res.data.resetPasswordToken,
          });
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user", res.data.email);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("resetToken", res.data.resetPasswordToken);
        } else {
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
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
              autoComplete="off"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="login__formInput"
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
            <button type="submit" className="login__formBtn">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// 5e2c64e6a0af5987fcf69545954765d1a74b922b078f1db25841fb0d7633dcca0139398cc6b8c3419ec1c19797d5cef249553d9ef6b7a66fbf537763afc3e91a78119a9fae38ee85fdd4665d53f9009170f4a63403958f45739e9296880245e59375424f9be85c3a0d16328afd4bd7dd3f4edb883ef5465c0b89d065c6af8aae
