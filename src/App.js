import "./App.css";
import Login from "./components/login/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import Library from "./components/Library/Library";
import { useEffect, useState } from "react";
import Book from "./components/Book/Book";
import Sidebar from "./components/Sidebar/Sidebar";
// import Chapter from "./components/Book/Chapter";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser("yash");
  }, []);

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
          />
        </Route>
        <Route path="/" exact>
          <Redirect to="/library" />
        </Route>
      </Switch>
    </div>
  ) : (
    <>
      <Redirect to="/" />
      <Route path="/" exact={true}>
        <Login />
      </Route>
    </>
  );
}

export default App;
