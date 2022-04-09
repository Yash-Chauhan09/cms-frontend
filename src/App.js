import "./App.css";
import Login from "./components/login/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import Library from "./components/Library/Library";
import { useEffect } from "react";
import Book from "./components/Book/Book";
import Sidebar from "./components/Sidebar/Sidebar";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import User from "./components/users/User";
import ResetPass from "./components/login/ResetPass";
// import Chapter from "./components/Book/Chapter";

function App() {
  const [{ user, userRole, accesstoken }, dispatch] = useStateValue();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const userRole = localStorage.getItem("role");
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
        userRole: userRole,
        accesstoken: accessToken,
      });
    }
  }, [dispatch]);

  return user ? (
    <div className="app">
      <Sidebar />
      <Switch>
        <Route path="/library" exact={true}>
          <Library />
        </Route>
        <Route path="/library/:bookid">
          <Book
            name="1-Year Student Bundle Grade 6, National Edition"
            author="McGraw-Hill Education"
            isbn="12345678900"
            sub="Biology"
            clas="biology"
            img="https://srv-supersonic-images.z-dn.net/cover_images/606d6bff-07fe-4ce1-98fa-1308c37e9b3f.jpeg"
          />{" "}
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/" exact>
          <Redirect to="/library" />
        </Route>
      </Switch>
    </div>
  ) : (
    <>
      <Route path="/reset-password/:token" exact={true}>
        <ResetPass />
      </Route>
      <Route path="/" exact={true}>
        <Login />
      </Route>
      <Redirect to="/" />
    </>
  );
}

export default App;
