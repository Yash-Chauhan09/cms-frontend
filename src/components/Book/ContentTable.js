import React from "react";
import "./TocCreation.css";
import "./ContentCreation.css";
import { Link, useRouteMatch } from "react-router-dom";

function ContentTable({
  chName,
  pageNo,
  id,
  type,
  parentid,
  question,
  answer,
  totalNo,
}) {
  const { url } = useRouteMatch();
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
}

export default ContentTable;
