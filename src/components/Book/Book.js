import React, { useEffect, useState } from "react";
import "./Book.css";
import TocCreation from "./TocCreation";
import ContentCreation from "./ContentCreation";
import BookDetail from "./BookDetail";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
// import Chapter from "./Chapter";
import axios from "axios";
import { useStateValue } from "../../StateProvider";
import TocChildren from "./TocChildren";
import TocQuestionChildren from "./TocQuestionChildren";
import ContentChidren from "./ContentChidren";
import ContentQuestionChildren from "./ContentQuestionChildren";
import ContentQuesPart from "./ContentQuesPart";
import QuestionNode from "./QuestionNode";
import TocQuesPart from "./TocQuesPart";
import AnswerNode from "./AnswerNode";
function Book() {
  const [{ accesstoken }] = useStateValue();
  const { path, url } = useRouteMatch();
  const [toc, setToc] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
  const [chstate, setChstate] = useState("");
  const [img, setImg] = useState("");
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
        // console.log(res);
        setToc(res.data.toc);
        setBookInfo(res.data.book_info);
        setImg(res.data.book_info.cover);
      })
      .catch((e) => console.log(e));
  }, [accesstoken, bookid, chstate]);
  return (
    <div className="book">
      {toc && <Redirect to={`${url}/toc`} />}
      <div className="book__details">
        <div className="book__img">
          <img
            src={`https://drive.google.com/u/3/uc?id=${img}&export=download`}
            alt="prev"
          />
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
            activeClassName="bookNav__active"
            key={elem.id}
            to={`${url}/${elem.linkroute}`}
          >
            <h5>{elem.name}</h5>
          </NavLink>
        ))}
      </nav>
      {/* <TocCreation /> */}
      <Switch>
        <Route path={`${path}/toc/:id/:exid/:quesid`}>
          <TocQuesPart bookid={bookid} />
        </Route>
        <Route path={`${path}/toc/:id/:exid`}>
          <TocQuestionChildren bookid={bookid} />
        </Route>
        <Route path={`${path}/toc/:id`}>
          <TocChildren bookid={bookid} />
        </Route>
        <Route
          path={`${path}/content-creation/:id/:exid/:quesid/answer/:quesnode`}
        >
          <AnswerNode bookid={bookid} />
        </Route>
        <Route path={`${path}/content-creation/:id/:exid/:quesid/:quesnode`}>
          <QuestionNode setChstate={setChstate} bookid={bookid} />
        </Route>
        <Route path={`${path}/content-creation/:id/:exid/:quesid`}>
          <ContentQuesPart bookid={bookid} />
        </Route>
        <Route path={`${path}/content-creation/:id/:exid`}>
          <ContentQuestionChildren bookid={bookid} />
        </Route>
        <Route path={`${path}/content-creation/:id`}>
          <ContentChidren bookid={bookid} />
        </Route>
        {/* <Route path={`${path}/content-creation/:id`} component={Chapter} /> */}
        <Route path={`${path}/toc`}>
          <TocCreation
            chstate={chstate}
            setChstate={setChstate}
            bookid={bookid}
            tocData={toc}
          />
        </Route>
        <Route path={`${path}/content-creation`}>
          <ContentCreation bookid={bookid} />
        </Route>
        <Route path={`${path}/book-detail`}>
          <BookDetail
            bookid={bookid}
            setChstate={setChstate}
            bookdetail={bookInfo}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default Book;
