import React from "react";
import "./TocCreation.css";
import "./ContentCreation.css";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../StateProvider";
// import QuestionNode from "./QuestionNode";

function ContentTable({
  chName,
  pageNo,
  id,
  type,
  // parentid,
  // question,
  // answer,
  totalNo,
  bookid,
}) {
  const { url } = useRouteMatch();
  const [{ accesstoken }] = useStateValue();
  const history = useHistory();
  const handleClick = (id) => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${id}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          history.push(`${url}/${id}/${id}`);
        } else {
          history.push(`${url}/${id}`);
        }
        // setContent(res.data);
      })
      .catch((e) => console.log(e));
  };
  const handleClickAns = (id) => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${id}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          history.push(`${url}/${id}/answer/${id}`);
        } else {
          history.push(`${url}/${id}`);
        }
      })
      .catch((e) => console.log(e));
  };

  if (type === "chapter") {
    return (
      <>
        <div className="toc__dataLeft">
          <div className="toc__dataName">
            <h5>CH</h5>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to={`${url}/${id}`}
            >
              <h4>{chName}</h4>
            </Link>
          </div>
          <div className="toc__dataPage">
            <p>{pageNo}</p>
          </div>
        </div>
        <div className="content__dataRight">
          <h5>Q: 2/{totalNo}</h5>
          <h5>A: 1/{totalNo}</h5>
          <h5>V: 0/{totalNo}</h5>
        </div>
      </>
    );
  } else if (type === "exercise") {
    return (
      <>
        <div className="toc__dataLeft">
          <div className="toc__dataName">
            <h5>EX</h5>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to={`${url}/${id}`}
            >
              <h4>{chName}</h4>
            </Link>
          </div>
          <div className="toc__dataPage">
            <p>{pageNo}</p>
          </div>
        </div>
        <div className="content__dataRight">
          <h5>Q: 2/{totalNo}</h5>
          <h5>A: 1/{totalNo}</h5>
          <h5>V: 0/{totalNo}</h5>
        </div>
      </>
    );
  } else if (type === "question") {
    return (
      <>
        <div className="toc__dataLeft">
          <div className="toc__dataName">
            <h5>Q</h5>
            <h4>{chName}</h4>
          </div>
          <div className="toc__dataPage">
            <p>{pageNo}</p>
          </div>
        </div>
        <div className="content__dataRight">
          <h5 onClick={() => handleClick(id)}>Q: 2/{totalNo}</h5>
          <h5 onClick={() => handleClickAns(id)}>A: 1/{totalNo}</h5>
          <h5>V: 0/{totalNo}</h5>
        </div>
      </>
    );
  } else if (type === "question-part") {
    return (
      <>
        <div className="toc__dataLeft">
          <div className="toc__dataName">
            <h5>QP</h5>
            <h4>{chName}</h4>
          </div>
          <div className="toc__dataPage">
            <p>{pageNo}</p>
          </div>
        </div>
        <div className="content__dataRight">
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to={`${url}/${id}`}
          >
            <h5>Q: 2/{totalNo}</h5>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to={`${url}/answer/${id}`}
          >
            <h5>A: 1/{totalNo}</h5>
          </Link>
          <h5>V: 0/{totalNo}</h5>
        </div>
      </>
    );
  }
}

export default ContentTable;
