import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./QuestionNode.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import ckeditor, { CKEditor } from "@ckeditor/ckeditor5-react";
import MathJax from "react-mathjax-preview";

function QuestionNode({ bookid }) {
  const { quesnode } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [question, setQuestion] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  // const [questionshow, setQuestionShow] = useState("Add Question");
  const [questionval, setQuestionVal] = useState("");
  const [state, setState] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setState("");
        setQuestion(res.data);
      })
      .catch((e) => console.log(e));
  }, [bookid, quesnode, accesstoken, state]);
  const handleAddQuestion = () => {
    console.log(question.parentid);
    let content = {
      type: question.type,
      parentid: question.parentid,
      bookid: bookid,
      name: question.name,
      page: question.page,
      question: questionval,
      answer: "null",
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        console.log(res);
        setShowEdit(false);
        setQuestionVal("");
        setState(res);
      })
      .catch((e) => console.log(e));
  };
  const math = String.raw`${question.question}`;
  if (question.question === "null") {
    return (
      <div className="questionNode">
        <h2 className="question__heading">Question</h2>
        <div className="question__show">
          <div className="question__data">
            <h4
              onClick={() => setShowEdit(true)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Add Question
            </h4>
          </div>
        </div>
        {showEdit && (
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
                console.log({ data });
                setQuestionVal(data);
              }}
            />
            <div className="question__editorButton">
              <button onClick={() => handleAddQuestion()}>Save</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="questionNode">
        <h2 className="question__heading">Question</h2>
        <div className="question__show">
          <div className="question__data">
            <MathJax math={math} />
          </div>
          <div className="question__edit">
            <IconButton onClick={() => setShowEdit(true)}>
              <EditIcon />
            </IconButton>
          </div>
        </div>
        {showEdit && (
          <div className="question__editor">
            <CKEditor
              editor={ClassicEditor}
              data={question.question}
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
                console.log({ data });
                setQuestionVal(data);
              }}
            />
            <div className="question__editorButton">
              <button onClick={() => handleAddQuestion()}>Save</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default QuestionNode;
