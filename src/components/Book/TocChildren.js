import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import TocTable from "./TocTable";

function TocChildren({ bookid }) {
  const { id } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [tocData, setTocData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [upId, setUpId] = useState();
  // const [question, setQuestion] = useState([]);
  const [state, setState] = useState("");

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
  const deleteEx = (id) => {
    axios({
      method: "delete",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${id}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setState("changed");
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${id}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setTocData(res.data);
      })
      .catch((e) => console.log(e));
  }, [accesstoken, bookid, state]);

  return (
    <div className="toc">
      <div className="toc__top">
        <p className="toc__topHeading">Table Of Contents</p>
        <h5 className="toc__topDraft"> Draft</h5>
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
              bookid={bookid}
              nodeid={data.nodeid}
              deleteEx={deleteEx}
              state={state}
              setState={setState}
              // setIsEdit={setIsEdit}
            />
          </div>
        ))}
        {isEdit && (
          <TocTable
            add="add"
            type="exercise"
            click={handleClick}
            bookid={bookid}
            id={id}
            state={state}
            setState={setState}
            // setIsEdit={setIsEdit}
          />
        )}
      </div>
      <div className="toc__addChapters">
        <button onClick={() => setIsEdit(true)} className="toc__addButtons">
          Add an excercise
        </button>
        <p>or</p>
        <button className="toc__addButtons">Add multiple excercise</button>
      </div>
    </div>
  );
}

export default TocChildren;
