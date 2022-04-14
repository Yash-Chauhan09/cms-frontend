import React, { useEffect, useState } from "react";
import "./User.css";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import UserTable from "./UserTable";
import { Redirect } from "react-router-dom";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 460,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #7289DA",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 6, 3),
  },
}));
function User() {
  const [{ accesstoken }] = useStateValue();

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(false);
  function makeToken(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handlePost = () => {
    let content = {
      email: email,
      password: makeToken(10),
      userRole: role,
    };
    axios({
      method: "post",
      url: "https://freecoedu-cms.herokuapp.com/users/",
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        setEmail("");
        setRole("");
        setOpen(false);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://freecoedu-cms.herokuapp.com/users",
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        if (res.data.error === "user not verified") {
          setNewUser(true);
        } else {
          setUsers(res.data);
        }
      })
      .catch((e) => console.log(e));
  }, [accesstoken]);
  if (newUser === false) {
    return (
      <div className="user">
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <form className="invitation__form">
              <h2>Invite new user</h2>
              <Input
                placeholder="Email email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
              <Input
                placeholder="Enter role"
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              ></Input>
              <Button onClick={() => handlePost()} className="submitBtn">
                Invite
              </Button>
            </form>
          </div>
        </Modal>
        <div className="user__top">
          <h2>Users</h2>
          <button className="user__topButton" onClick={() => setOpen(true)}>
            <span>
              <AddIcon />
            </span>
            Invite New User
          </button>
        </div>
        <div className="user__body">
          <table className="library__table">
            <tr>
              <th className="library__tableHead">Email</th>
              <th className="library__tableHead">Role</th>
            </tr>
            {users.map((data, index) => {
              return (
                <UserTable
                  key={index}
                  email={data.email}
                  role={data.userRole}
                />
              );
            })}
          </table>
        </div>
      </div>
    );
  } else {
    return <Redirect to={"/reset-password"} />;
  }
}

export default User;
