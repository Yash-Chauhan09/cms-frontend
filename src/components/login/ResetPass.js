import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import img from "../images/loginImage.svg";
import axios from "axios";
function ResetPass() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confPassword, setCnfPassword] = useState("");
  const { token } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    let content = {
      password: password,
      confirmpassword: confPassword,
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/users/reset-password/${token}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        console.log(token);
        history.push("/");
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="login__formInput"
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
            />
            <input
              onChange={(e) => setCnfPassword(e.target.value)}
              value={confPassword}
              className="login__formInput"
              type="password"
              placeholder="Enter Confirm Password"
              autoComplete="off"
            />

            <button type="submit" className="login__formBtn">
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
