import React, { useState } from "react";
import "./TocCreation.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Link, useRouteMatch } from "react-router-dom";
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
  deleteEx,
  setState,
  setChstate,
  setQuesState,
  setQuesPartState,
  // chState,
}) {
  const { url } = useRouteMatch();
  // const history = useHistory();
  // const { exid } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [ch, setCh] = useState();
  const [page, setPage] = useState();
  const [ex, setEx] = useState();
  const [expage, setExPage] = useState();
  const [upex, setUpEx] = useState(chName);
  const [upexpage, setUpExPage] = useState(pageNo);
  const [ques, setQues] = useState();
  const [quespage, setQuesPage] = useState();
  const [upques, setUpQues] = useState(chName);
  const [upquespage, setUpQuesPage] = useState(pageNo);
  const [quespart, setQuesPart] = useState();
  const [quespartpage, setQuesPartPage] = useState();
  const [upquespart, setUpQuesPart] = useState(chName);
  const [upquespartpage, setUpQuesPartPage] = useState(pageNo);
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
        setChstate(res.data.success);
      })
      .catch((e) => console.log(e));
  };
  const addExercise = (id) => {
    // console.log(parentid);
    let content = {
      type: "exercise",
      parentid: id,
      bookid: bookid,
      name: ex,
      page: expage,
      question: "null",
      answer: "null",
    };
    axios({
      method: "post",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${id}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setState(res);
        click();
      })
      .catch((e) => console.log(e));
  };
  const addQuestion = (id) => {
    // console.log(parentid);
    let content = {
      type: "question",
      parentid: id,
      bookid: bookid,
      name: ques,
      page: quespage,
      question: "null",
      answer: "null",
    };
    axios({
      method: "post",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${id}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setQuesState(res);
        click();
      })
      .catch((e) => console.log(e));
  };
  const addQuestionPart = (id) => {
    // console.log(parentid);
    let content = {
      type: "question-part",
      parentid: id,
      bookid: bookid,
      name: quespart,
      page: quespartpage,
      question: "null",
      answer: "null",
    };
    axios({
      method: "post",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${id}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setQuesPartState(res);
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
        cancel();
        console.log(res);
        setChstate(res);
      })
      .catch((e) => console.log(e));
  };
  const updateExercise = () => {
    let content = {
      type: "exercise",
      parentid: parentid,
      bookid: bookid,
      name: upex,
      page: upexpage,
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
        cancel();
        console.log(res);
        setState(res);
      })
      .catch((e) => console.log(e));
  };
  const updateQuestion = () => {
    let content = {
      type: "question",
      parentid: parentid,
      bookid: bookid,
      name: upques,
      page: upquespage,
      question: "null",
      answer: "null",
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${id}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        cancel();
        console.log(res);
        setQuesState(res);
      })
      .catch((e) => console.log(e));
  };
  const updateQuestionPart = () => {
    let content = {
      type: "question-part",
      parentid: parentid,
      bookid: bookid,
      name: upquespart,
      page: upquespartpage,
      question: "null",
      answer: "null",
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${id}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        cancel();
        console.log(res);
        setQuesPartState(res);
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
        setChstate(res);
      })
      .catch((e) => console.log(e));
  };
  const deleteQuestion = () => {
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
        setQuesState(res);
      })
      .catch((e) => console.log(e));
  };
  const deleteQuesPart = () => {
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
        setQuesPartState(res);
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
                <input
                  type="text"
                  value={upex}
                  onChange={(e) => setUpEx(e.target.value)}
                />
              </div>
              <div className="toc__inpPage">
                <input
                  type="number"
                  value={upexpage}
                  onChange={(e) => setUpExPage(e.target.value)}
                />
              </div>
            </div>
            <div className="toc__dataButton">
              <button onClick={() => updateExercise()}>Save</button>
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
              <IconButton onClick={() => deleteEx(nodeid)}>
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
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setQues(e.target.value)}
              value={ques}
            />
          </div>
          <div className="toc__inpPage">
            <input
              type="number"
              placeholder="Page"
              onChange={(e) => setQuesPage(e.target.value)}
              value={quespage}
            />
          </div>
        </div>
        <div className="toc__dataButton">
          <button onClick={() => addQuestion(id)}>Save</button>
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
                <input
                  type="text"
                  value={upques}
                  onChange={(e) => setUpQues(e.target.value)}
                />
              </div>
              <div className="toc__inpPage">
                <input
                  type="number"
                  value={upquespage}
                  onChange={(e) => setUpQuesPage(e.target.value)}
                />
              </div>
            </div>
            <div className="toc__dataButton">
              <button onClick={() => updateQuestion()}>Save</button>
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
              <IconButton onClick={() => deleteQuestion()}>
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
  } else if (type === "question-part") {
    return add ? (
      <div className="toc__data">
        <div className="toc__dataLeft">
          <div className="toc__inpName">
            <h5>QP</h5>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setQuesPart(e.target.value)}
              value={quespart}
            />
          </div>
          <div className="toc__inpPage">
            <input
              type="number"
              placeholder="Page"
              onChange={(e) => setQuesPartPage(e.target.value)}
              value={quespartpage}
            />
          </div>
        </div>
        <div className="toc__dataButton">
          <button onClick={() => addQuestionPart(id)}>Save</button>
          <button onClick={click}>Cancel</button>
        </div>
      </div>
    ) : (
      <>
        {id === updatedId ? (
          <>
            <div className="toc__dataLeft">
              <div className="toc__inpName">
                <h5>QP</h5>
                <input
                  type="text"
                  onChange={(e) => setUpQuesPart(e.target.value)}
                  value={upquespart}
                />
              </div>
              <div className="toc__inpPage">
                <input
                  type="number"
                  onChange={(e) => setUpQuesPartPage(e.target.value)}
                  value={upquespartpage}
                />
              </div>
            </div>
            <div className="toc__dataButton">
              <button onClick={() => updateQuestionPart()}>Save</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </>
        ) : (
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
              <IconButton onClick={() => deleteQuesPart()}>
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
// {
//   "email":"ramavtar@freeco.co.in",
//   "password":"9509650330"
// }
