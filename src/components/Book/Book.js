import React, { useState } from "react";
import "./Book.css";
import TocCreation from "./TocCreation";
import ContentCreation from "./ContentCreation";
import BookDetail from "./BookDetail";
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Chapter from "./Chapter";
function Book({ name, author, isbn, sub, classes, img }) {
  const { path, url } = useRouteMatch();
  const [selected, setSelected] = useState(false);
  const id = useParams();
  return (
    <div className="book">
      <div className="book__details">
        <div className="book__img">
          <img src={img} alt="thumbnail" />
        </div>
        <div className="book__detail">
          <h3 className="book__detailHead">{name}</h3>
          <p className="book__detailPara">
            Author: {author} / ISBN: {isbn}
          </p>
          <p className="book__detailPara">
            Class: {classes} / Subject: {sub}
          </p>
        </div>
      </div>
      <nav className="book__nav">
        <NavLink
          onClick={() =>
            selected === true ? setSelected(false) : setSelected(true)
          }
          className={selected ? "bookNav__active" : ""}
          exact
          to={`${url}/toc`}
        >
          <h5>Toc creation</h5>
        </NavLink>
        <NavLink
          onClick={() =>
            selected === true ? setSelected(false) : setSelected(true)
          }
          className={selected ? "bookNav__active" : ""}
          exact
          to={`${url}/content-creation`}
        >
          <h5>content creation</h5>
        </NavLink>
        <NavLink
          onClick={() =>
            selected === true ? setSelected(false) : setSelected(true)
          }
          className={selected ? "bookNav__active" : ""}
          exact
          to={`${url}/book-detail`}
        >
          <h5>Book detail</h5>
        </NavLink>
      </nav>
      <Switch>
        <Route path={`${path}/toc/:id`} component={Chapter} />
        <Route path={`${path}/content-creation/:id`} component={Chapter} />
        <Route path={`${path}/toc`} component={TocCreation} />
        <Route path={`${path}/content-creation`} component={ContentCreation} />
        <Route path={`${path}/book-detail`} component={BookDetail} />
      </Switch>
    </div>
  );
}

export default Book;
