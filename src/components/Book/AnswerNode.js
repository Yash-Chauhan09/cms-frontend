import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AnswerNode.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import MathJax from "react-mathjax-preview";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
let answerVal = {};
let questionVal = {};
function AnswerNode({ bookid }) {
  const { quesnode } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [response, setResponse] = useState({});
  const [showExp, setShowExp] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [expVal, setExpVal] = useState("");
  const [finalVal, setFinalVal] = useState("");
  const [state, setState] = useState("");
  const [quesres, setQuesres] = useState();
  // const [questionVal, setQuestionVal] = useState({});
  // const [answerVal, setAnswerval] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    }).then((res) => {
      console.log(res.data);
      answerVal = {};
      // console.log(res.data.answer);

      if (res.data.answer === "null") {
        answerVal = {};
      } else {
        console.log(res.data.ans);
        const str = res.data.answer;
        answerVal = JSON.parse(str.substring(1, str.length - 1));
      }
      if (res.data.question === "null") {
        questionVal = {};
      } else {
        questionVal = {};
        const str2 = res.data.question;
        questionVal = JSON.parse(str2.substring(1, str2.length - 1));
      }
      setResponse(res.data);
      setQuesres(res.data.question);
      setState("");
    });
    // .catch((e) => console.log(e));
  }, [bookid, quesnode, accesstoken, state]);
  const handleAddExp = () => {
    // console.log(JSON.stringify(JSON.stringify(questionVal)));
    // console.log(response);

    let data = "null";
    answerVal.explaination = expVal;
    answerVal.type = "answer";
    data = JSON.stringify(JSON.stringify(answerVal));
    let content = {
      answer: data,
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}/answer`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    }).then((res) => {
      setShowExp(false);
      setExpVal("");
      setState(res);
      answerVal = {};
      questionVal = {};
    });
    // .catch((e) => console.log(e));
  };
  const handleAddFinalAns = () => {
    // console.log(JSON.stringify(JSON.stringify(questionVal)));
    // console.log(response);
    let data = "null";
    answerVal.final = finalVal;
    answerVal.type = "answer";
    data = JSON.stringify(JSON.stringify(answerVal));
    let content = {
      answer: data,
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}/answer`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    }).then((res) => {
      setShowFinal(false);
      setFinalVal("");
      setState(res);
      answerVal = {};
      questionVal = {};
    });
    // .catch((e) => console.log(e));
  };
  const math = String.raw`${questionVal.question1}`;
  const math2 = String.raw`${questionVal.question2}`;
  const opta = String.raw`${questionVal.optiona}`;
  const optb = String.raw`${questionVal.optionb}`;
  const optc = String.raw`${questionVal.optionc}`;
  const optd = String.raw`${questionVal.optiond}`;
  const expAns = String.raw`${answerVal.explaination}`;
  const finalAns = String.raw`${answerVal.final}`;
  const displayQuestion = () => {
    if (Object.keys(questionVal).length === 0) {
      return "Null";
    } else if (questionVal.type === "paragraph") {
      return (
        <>
          <div className="answerNode__questionShow">
            <MathJax math={math} />
          </div>
        </>
      );
    } else if (questionVal.type === "mcq") {
      return (
        <>
          <div className="answerNode__questionShow">
            <span>Q) </span> <MathJax math={math2} />
          </div>
          <div className="answerNode__questionShow">
            <span>a) </span> <MathJax math={opta} />
          </div>
          <div className="answerNode__questionShow">
            <span>b) </span> <MathJax math={optb} />
          </div>
          <div className="answerNode__questionShow">
            <span>c) </span> <MathJax math={optc} />
          </div>
          <div className="answerNode__questionShow">
            <span>d) </span> <MathJax math={optd} />
          </div>
        </>
      );
    }
  };
  if (response.answer === "null") {
    return (
      <div className="answerNode">
        <div className="answerNode__question">
          <h2>Question</h2>
          {displayQuestion()}
        </div>
        <div className="answerNode__answers">
          <button className="btnAns" onClick={() => setShowExp(true)}>
            Explaination
          </button>
          {showExp && (
            <div className="question__editor">
              <CKEditor
                editor={ClassicEditor}
                data=""
                config={{
                  toolbar: {
                    items: [
                      "heading",
                      "MathType",
                      "ChemType",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "imageUpload",
                      "mediaEmbed",
                      "insertTable",
                      "blockQuote",
                      "undo",
                      "redo",
                    ],
                  },
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setExpVal(data);
                }}
              />
              <div className="question__editorButton">
                <button className="btnAns" onClick={() => handleAddExp()}>
                  Save
                </button>
                <button className="btnAns" onClick={() => setShowExp(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          <button className="btnAns" onClick={() => setShowFinal(true)}>
            Final Answer
          </button>
          {showFinal && (
            <div className="question__editor">
              <CKEditor
                editor={ClassicEditor}
                data=""
                config={{
                  toolbar: {
                    items: [
                      "heading",
                      "MathType",
                      "ChemType",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "imageUpload",
                      "mediaEmbed",
                      "insertTable",
                      "blockQuote",
                      "undo",
                      "redo",
                    ],
                  },
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFinalVal(data);
                }}
              />
              <div className="question__editorButton">
                <button className="btnAns" onClick={() => handleAddFinalAns()}>
                  Save
                </button>
                <button className="btnAns" onClick={() => setShowFinal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else if (response.answer !== "null") {
    return (
      <div className="answerNode">
        <div className="answerNode__question">
          <h2>Question</h2>
          {displayQuestion()}
        </div>
        <div className="answerNode__answers">
          <div className="answer__show">
            <div className="question__data">
              <h2>Explaination</h2>
              <MathJax math={expAns} />
            </div>
            <div className="question__edit">
              <IconButton onClick={() => setShowExp(true)}>
                <EditIcon />
              </IconButton>
            </div>
          </div>
          {showExp && (
            <div className="question__editor">
              <CKEditor
                editor={ClassicEditor}
                data=""
                config={{
                  toolbar: {
                    items: [
                      "heading",
                      "MathType",
                      "ChemType",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "imageUpload",
                      "mediaEmbed",
                      "insertTable",
                      "blockQuote",
                      "undo",
                      "redo",
                    ],
                  },
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ data });
                  setExpVal(data);
                }}
              />
              <div className="question__editorButton">
                <button className="btnAns" onClick={() => handleAddExp()}>
                  Save
                </button>
                <button className="btnAns" onClick={() => setShowExp(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="answer__show">
            <div className="question__data">
              <h2>Final Answer</h2>
              {finalAns !== "undefined" ? (
                <MathJax math={finalAns} />
              ) : (
                <h2> Add final Answer</h2>
              )}
            </div>
            <div className="question__edit">
              <IconButton onClick={() => setShowFinal(true)}>
                <EditIcon />
              </IconButton>
            </div>
          </div>
          {showFinal && (
            <div className="question__editor">
              <CKEditor
                editor={ClassicEditor}
                data=""
                config={{
                  toolbar: {
                    items: [
                      "heading",
                      "MathType",
                      "ChemType",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "imageUpload",
                      "mediaEmbed",
                      "insertTable",
                      "blockQuote",
                      "undo",
                      "redo",
                    ],
                  },
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ data });
                  setFinalVal(data);
                }}
              />
              <div className="question__editorButton">
                <button className="btnAns" onClick={() => handleAddFinalAns()}>
                  Save
                </button>
                <button className="btnAns" onClick={() => setShowFinal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AnswerNode;
