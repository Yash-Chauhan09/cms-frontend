import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import ShowChartIcon from "@mui/icons-material/ShowChart";
function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink activeClassName="sidebar__active" to="/library">
        <LibraryBooksIcon />
        <p>Library</p>
      </NavLink>
      <NavLink exact activeClassName="sidebar__active" to="/">
        <AccountBalanceWalletIcon />
        <p>Booklets</p>
      </NavLink>
      <NavLink exact activeClassName="sidebar__active" to="/">
        <PersonIcon />
        <p>Users</p>
      </NavLink>
      <NavLink exact activeClassName="sidebar__active" to="/">
        <ShowChartIcon />
        <p>Market</p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
