import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../StateProvider";
import "./TocCreation.css";
import { CSVLink } from "react-csv";
import TocTable from "./TocTable";
function TocCreation({ tocData, bookid, setChstate, chstate }) {
  const [{ accesstoken }] = useStateValue();
  const [isEdit, setIsEdit] = useState(false);
  const [upId, setUpId] = useState();
  const [data, setData] = useState([]);

  const editChapter = (id) => {
    setUpId(id);
  };
  const handleClick = () => {
    setIsEdit(false);
  };
  const handleCancel = () => {
    setUpId(null);
    // console.log(upId);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/generate-content-links-csv`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }, [bookid, accesstoken]);
  const headers = [
    {
      label: "isbn",
      key: "ISBN",
    },
    {
      label: "Book Title",
      key: "Book_Title",
    },
    {
      label: "NAME",
      key: "Name",
    },
    {
      label: "page",
      key: "Page",
    },
    {
      label: "Question Exists",
      key: "Question_Exists",
    },
    {
      label: "Question Link",
      key: "Question_Link",
    },
    {
      label: "Answer Exists",
      key: "Answer_Exists",
    },
    {
      label: "Answer Link",
      key: "Answer_Link",
    },
    {
      label: "Video Link",
      key: "Video_Link",
    },
    {
      label: "Video Link",
      key: "Video_Link",
    },
  ];
  const csvLink = {
    headers: headers,
    data: data,
    filename: "csvfile.csv",
  };
  return (
    <div className="toc">
      <div style={{ justifyContent: "space-between" }} className="toc__top">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="toc__topHeading">Table Of Contents</p>
          <h5 className="toc__topDraft">Draft</h5>
        </div>
        <Button className="csv__btn">
          <CSVLink
            style={{ color: "#000", textDecoration: "none" }}
            {...csvLink}
          >
            Export As Csv
          </CSVLink>
        </Button>
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
