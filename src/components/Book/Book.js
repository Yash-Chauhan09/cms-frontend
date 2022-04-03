import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useStateValue } from "../../StateProvider";
import TocChildren from "./TocChildren";
import TocQuestionChildren from "./TocQuestionChildren";
import ContentChidren from "./ContentChidren";
import ContentQuestionChildren from "./ContentQuestionChildren";
function Book() {
  const [{ accesstoken }] = useStateValue();
  const { path, url } = useRouteMatch();
  const [toc, setToc] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
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
  const { bookid } = useParams();
  // console.log(id);
  useEffect(() => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}?withProgress=false`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setToc(res.data.toc);
        setBookInfo(res.data.book_info);
      })
      .catch((e) => console.log(e));
  }, [accesstoken, bookid]);
  return (
    <div className="book">
      <div className="book__details">
        <div className="book__img">
          <img src={bookInfo.cover} alt="prev" />
        </div>
        <div className="book__detail">
          <h3 className="book__detailHead">{bookInfo.title}</h3>
          <p className="book__detailPara">
            Author: {bookInfo.author} / ISBN: {bookInfo.isbn}
          </p>
          <p className="book__detailPara">
            Class: {bookInfo.class} / Subject: {bookInfo.subject}
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
      {/* <TocCreation /> */}
      <Switch>
        <Route path={`${path}/toc/:id/:exid`}>
          <TocQuestionChildren bookid={bookid} />
        </Route>
        <Route path={`${path}/toc/:id`}>
          <TocChildren bookid={bookid} />
        </Route>
        <Route path={`${path}/content-creation/:id/:exid`}>
          <ContentQuestionChildren bookid={bookid} />
        </Route>
        <Route path={`${path}/content-creation/:id`}>
          <ContentChidren bookid={bookid} />
        </Route>
        {/* <Route path={`${path}/content-creation/:id`} component={Chapter} /> */}
        <Route path={`${path}/toc`}>
          <TocCreation tocData={toc} />
        </Route>
        <Route path={`${path}/content-creation`}>
          <ContentCreation bookid={bookid} />
        </Route>
        <Route path={`${path}/book-detail`}>
          <BookDetail bookdetail={bookInfo} />
        </Route>
      </Switch>
    </div>
  );
}

export default Book;
