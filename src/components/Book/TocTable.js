import React, { useEffect, useState } from "react";
import "./TocCreation.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../StateProvider";

function TocTable({
  chName,
  pageNo,
  id,
  add,
  click,
  onEdit,
  updatedId,
  cancel,
  type,
  bookid,
  nodeid,
  parentid,
}) {
  const { url } = useRouteMatch();
  // const { exid } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [ch, setCh] = useState();
  const [page, setPage] = useState();
  const [ex, setEx] = useState();
  const [expage, setExPage] = useState();
  const [upch, setUpch] = useState(chName);
  const [upPage, setUpPage] = useState(pageNo);
  const addChapter = () => {
    let content = {
      type: "chapter",
      parentid: bookid,
      bookid: bookid,
      name: ch,
      page: page,
      question: "null",
      answer: "null",
    };
    axios({
      method: "post",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        click();
      })
      .catch((e) => console.log(e));
  };
  const addExercise = () => {
    console.log(id);
    let content = {
      type: "exercise",
      parentid: bookid,
      bookid: bookid,
      name: ex,
      page: expage,
      question: "null",
      answer: "null",
    };
    axios({
      method: "post",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${id}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        click();
      })
      .catch((e) => console.log(e));
  };
  const updateChapter = () => {
    let content = {
      type: "chapter",
      parentid: bookid,
      bookid: bookid,
      name: upch,
      page: upPage,
      question: "null",
      answer: "null",
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${nodeid}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  const deleteCh = () => {
    axios({
      method: "delete",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${nodeid}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  if (type === "chapter") {
    return add ? (
      <div className="toc__data">
        <div className="toc__dataLeft">
          <div className="toc__inpName">
            <h5>CH</h5>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setCh(e.target.value)}
              value={ch}
            />
          </div>
          <div className="toc__inpPage">
            <input
              type="number"
              placeholder="Page"
              onChange={(e) => setPage(e.target.value)}
              value={page}
            />
          </div>
        </div>
        <div className="toc__dataButton">
          <button onClick={() => addChapter()}>Save</button>
          <button onClick={click}>Cancel</button>
        </div>
      </div>
    ) : (
      <>
        {id === updatedId ? (
          <>
            <div className="toc__dataLeft">
              <div className="toc__inpName">
                <h5>CH</h5>
                <input
                  type="text"
                  value={upch}
                  onChange={(e) => setUpch(e.target.value)}
                />
              </div>
              <div className="toc__inpPage">
                <input
                  type="number"
                  value={upPage}
                  onChange={(e) => setUpPage(e.target.value)}
                />
              </div>
            </div>
            <div className="toc__dataButton">
              <button onClick={() => updateChapter()}>Save</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </>
        ) : (
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
            <div className="toc__dataRight">
              <IconButton onClick={() => onEdit(id)}>
                <EditIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton onClick={() => deleteCh()}>
                <DeleteIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton>
                <BarChartIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />{" "}
              </IconButton>
              <IconButton>
                <MoreVertIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </div>
          </>
        )}
      </>
    );
  } else if (type === "exercise") {
    return add ? (
      <div className="toc__data">
        <div className="toc__dataLeft">
          <div className="toc__inpName">
            <h5>EX</h5>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setEx(e.target.value)}
              value={ex}
            />
          </div>
          <div className="toc__inpPage">
            <input
              type="number"
              placeholder="Page"
              onChange={(e) => setExPage(e.target.value)}
              value={expage}
            />
          </div>
        </div>
        <div className="toc__dataButton">
          <button onClick={() => addExercise(id)}>Save</button>
          <button onClick={click}>Cancel</button>
        </div>
      </div>
    ) : (
      <>
        {id === updatedId ? (
          <>
            <div className="toc__dataLeft">
              <div className="toc__inpName">
                <h5>EX</h5>
                <input type="text" defaultValue={chName} />
              </div>
              <div className="toc__inpPage">
                <input type="number" defaultValue={pageNo} />
              </div>
            </div>
            <div className="toc__dataButton">
              <button>Save</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </>
        ) : (
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
            <div className="toc__dataRight">
              <IconButton onClick={() => onEdit(id)}>
                <EditIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton>
                <DeleteIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton>
                <BarChartIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />{" "}
              </IconButton>
              <IconButton>
                <MoreVertIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </div>
          </>
        )}
      </>
    );
  } else if (type === "question") {
    return add ? (
      <div className="toc__data">
        <div className="toc__dataLeft">
          <div className="toc__inpName">
            <h5>Q</h5>
            <input type="text" placeholder="Name" />
          </div>
          <div className="toc__inpPage">
            <input type="number" placeholder="Page" />
          </div>
        </div>
        <div className="toc__dataButton">
          <button>Save</button>
          <button onClick={click}>Cancel</button>
        </div>
      </div>
    ) : (
      <>
        {id === updatedId ? (
          <>
            <div className="toc__dataLeft">
              <div className="toc__inpName">
                <h5>Q</h5>
                <input type="text" defaultValue={chName} />
              </div>
              <div className="toc__inpPage">
                <input type="number" defaultValue={pageNo} />
              </div>
            </div>
            <div className="toc__dataButton">
              <button>Save</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="toc__dataLeft">
              <div className="toc__dataName">
                <h5>Q</h5>
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
            <div className="toc__dataRight">
              <IconButton onClick={() => onEdit(id)}>
                <EditIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton>
                <DeleteIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
              <IconButton>
                <BarChartIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />{" "}
              </IconButton>
              <IconButton>
                <MoreVertIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "grey",
                    margin: "0 0.6rem",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </div>
          </>
        )}
      </>
    );
  }
}

export default TocTable;
