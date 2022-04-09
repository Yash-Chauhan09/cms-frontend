import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AnswerNode.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import MathJax from "react-mathjax-preview";
import ckeditor, { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
let answerVal = {};
function AnswerNode({ bookid }) {
  const { quesnode } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [response, setResponse] = useState({});
  const [showExp, setShowExp] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [expVal, setExpVal] = useState("");
  const [finalVal, setFinalVal] = useState("");
  const [state, setState] = useState("");
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
      if (res.data.answer === "null") {
        answerVal = {};
      } else {
        answerVal = JSON.parse(res.data.answer);
      }
      setResponse(res.data);
      setState("");
    });
    // .catch((e) => console.log(e));
  }, [bookid, quesnode, accesstoken, state]);
  const handleAddExp = () => {
    // setAnswerval((prev) => {
    //   return { ...prev, explaination: expVal, finalAns: finalVal };
    // });
    answerVal.explaination = expVal;
    let content = {
      type: response.type,
      parentid: response.parentid,
      bookid: bookid,
      name: response.name,
      page: response.page,
      question: response.question,
      answer: JSON.stringify(answerVal),
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}`,
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
    });
    // .catch((e) => console.log(e));
  };
  const handleAddFinalAns = () => {
    answerVal.final = finalVal;
    let content = {
      type: response.type,
      parentid: response.parentid,
      bookid: bookid,
      name: response.name,
      page: response.page,
      question: response.question,
      answer: JSON.stringify(answerVal),
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}`,
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
    });
    // .catch((e) => console.log(e));
  };
  const math = String.raw`${response.question}`;
  const expAns = String.raw`${answerVal.explaination}`;
  const finalAns = String.raw`${answerVal.final}`;
  if (response.answer === "null") {
    return (
      <div className="answerNode">
        <div className="answerNode__question">
          <h2>Question</h2>
          <div className="answerNode__questionShow">
            <MathJax math={math} />
          </div>
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
  } else {
    return (
      <div className="answerNode">
        <div className="answerNode__question">
          <h2>Question</h2>
          <div className="answerNode__questionShow">
            {<MathJax math={math} />}
          </div>
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
