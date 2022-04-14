import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../StateProvider";

function ResetPass() {
  const [{ resetToken }] = useStateValue();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confPassword, setCnfPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    let content = {
      password: password,
      confirmpassword: confPassword,
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/users/reset-password/${resetToken}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        history.push("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="reset">
      <div className="login__container-form">
        <h3 className="login__formHeading">Reset your password</h3>
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
  );
}

export default ResetPass;
