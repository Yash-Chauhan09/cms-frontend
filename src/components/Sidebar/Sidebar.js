import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../reducer";
import Loader from "react-js-loader";
// import ShowChartIcon from "@mui/icons-material/ShowChart";
function Sidebar() {
  const [{ accesstoken, userRole }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  const handleLogOut = () => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://freecoedu-cms.herokuapp.com/auth/signout",
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then(() => {
        setLoading(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
          userRole: null,
          accesstoken: null,
        });
        // history.push("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="sidebar">
      <NavLink activeClassName="sidebar__active" to="/library">
        <LibraryBooksIcon />
        <p>Library</p>
      </NavLink>
      <NavLink exact activeClassName="sidebar__active" to="/booklet">
        <AccountBalanceWalletIcon />
        <p>Booklets</p>
      </NavLink>
      {userRole === "admin" && (
        <NavLink exact activeClassName="sidebar__active" to="/user">
          <PersonIcon />
          <p>Users</p>
        </NavLink>
      )}
      <div className="logout" onClick={() => handleLogOut()}>
        {loading ? (
          <Loader
            type="spinner-default"
            bgColor={"#3535CA"}
            color={"#3535CA"}
            size={40}
          />
        ) : (
          <LogoutIcon />
        )}
        <p>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
