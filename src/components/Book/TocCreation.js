import React, { useState } from "react";
// import { Link, Route, Switch } from "react-router-dom";
import "./TocCreation.css";
import TocTable from "./TocTable";
const Data = [
  {
    type: "chapter",
    parentid: null,
    bookid: "dwedew",
    name: "Chapter 2 : Integers and Algebraic Expressions",
    page: "85",
    question: "2+3?",
    answer: "5",
  },
  {
    type: "chapter",
    parentid: null,
    bookid: "dwedew",
    name: "Chapter 3 : Integers and Algebraic Expressions",
    page: "85",
    question: "2+3?",
    answer: "5",
  },
  {
    type: "chapter",
    parentid: null,
    bookid: "dwedew",
    name: "Chapter 4 : Integers and Algebraic Expressions",
    page: "85",
    question: "2+3?",
    answer: "5",
  },
  {
    type: "chapter",
    parentid: null,
    bookid: "dwedew",
    name: "Chapter 5 : Integers and Algebraic Expressions",
    page: "85",
    question: "2+3?",
    answer: "5",
  },
];
function TocCreation({ tocData, bookid, setChstate, chstate }) {
  const [isEdit, setIsEdit] = useState(false);
  const [upId, setUpId] = useState();

  const editChapter = (id) => {
    setUpId(id);
  };
  const handleClick = () => {
    setIsEdit(false);
  };
  const handleCancel = () => {
    setUpId(null);
    console.log(upId);
  };
  return (
    <div className="toc">
      <div className="toc__top">
        <p className="toc__topHeading">Table Of Contents</p>
        <h5 className="toc__topDraft">Draft</h5>
      </div>
      <div className="toc__body">
        {tocData.map((data, index) => (
          <div className="toc__data" key={index}>
            <TocTable
              id={data.nodeid}
              chName={data.name}
              pageNo={data.page}
              onEdit={editChapter}
              updatedId={upId}
              cancel={handleCancel}
              type={data.type}
              parentid={data.parentid}
              nodeid={data.nodeid}
              bookid={data.bookid}
              setChstate={setChstate}
              chstate={chstate}
            />
          </div>
        ))}
        {isEdit && (
          <TocTable
            add="add"
            type="chapter"
            click={handleClick}
            bookid={bookid}
            setChstate={setChstate}
          />
        )}
      </div>
      <div className="toc__addChapters">
        <button onClick={() => setIsEdit(true)} className="toc__addButtons">
          Add a chapter
        </button>
        <p>or</p>
        <button className="toc__addButtons">Add multiple chapters</button>
      </div>
    </div>
  );
}

export default TocCreation;
