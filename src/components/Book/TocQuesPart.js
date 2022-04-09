import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import TocTable from "./TocTable";

function TocQuesPart({ bookid }) {
  const { quesid } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [tocData, setTocData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [upId, setUpId] = useState();
  const [quesPartState, setQuesPartState] = useState();

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
  useEffect(() => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${quesid}`,
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
  }, [accesstoken, bookid, quesid, quesPartState]);

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
              setQuesPartState={setQuesPartState}
            />
          </div>
        ))}
        {isEdit && (
          <TocTable
            type="question-part"
            bookid={bookid}
            add="add"
            click={handleClick}
            setQuesPartState={setQuesPartState}
            id={quesid}
          />
        )}
      </div>
      <div className="toc__addChapters">
        <button onClick={() => setIsEdit(true)} className="toc__addButtons">
          Add a Question Part
        </button>
        <p>or</p>
        <button className="toc__addButtons">Add multiple Question Part</button>
      </div>
    </div>
  );
}

export default TocQuesPart;
