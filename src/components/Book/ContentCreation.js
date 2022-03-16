import React, { useState } from "react";
import ContentTable from "./ContentTable";
import "./TocCreation.css";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
function ContentCreation() {
  const [tocData, setTocData] = useState(Data);

  // console.log(tocData);
  return (
    <div className="toc">
      <div className="toc__top">
        <p className="toc__topHeading">Table Of Contents</p>
      </div>
      <div className="toc__body">
        {tocData.map((data, index) => (
          <div className="toc__data" key={index}>
            <ContentTable id={index} chName={data.name} pageNo={data.page} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentCreation;
