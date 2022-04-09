import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../reducer";
// import ShowChartIcon from "@mui/icons-material/ShowChart";
function Sidebar() {
  const [{ accesstoken, userRole }, dispatch] = useStateValue();
  const handleLogOut = () => {
    axios({
      method: "get",
      url: "https://freecoedu-cms.herokuapp.com/auth/signout",
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
          userRole: null,
          accesstoken: null,
        });
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
        <LogoutIcon />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
