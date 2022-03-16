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
  const [initialState, setInitialState] = useState({
    activeObject: null,
    objects: [
      {
        id: 1,
        name: "Toc creation",
        linkroute: "toc",
      },
      {
        id: 2,
        name: "Content creation",
        linkroute: "content-creation",
      },
      {
        id: 3,
        name: "Book detail",
        linkroute: "book-detail",
      },
    ],
  });
  const toggleActive = (id) => {
    setInitialState({
      ...initialState,
      activeObject: initialState.objects[id],
    });
  };
  const toggleActiveClass = (id) => {
    if (initialState.objects[id] === initialState.activeObject) {
      return "bookNav__active";
    } else {
      return "bookNav__Inactive";
    }
  };
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
        {initialState.objects.map((elem) => (
          <NavLink
            className={toggleActiveClass(elem.id)}
            onClick={() => toggleActive(elem.id)}
            exact
            key={elem.id}
            to={`${url}/${elem.linkroute}`}
          >
            <h5>{elem.name}</h5>
          </NavLink>
        ))}
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
