import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./QuestionNode.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import MathJax from "react-mathjax-preview";
let quesData = {};
let ansVal = {};
function QuestionNode({ bookid, setChstate }) {
  const { quesnode } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [question, setQuestion] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);
  const [mcqQues, setMcqQues] = useState(false);
  const [opt1, setOpt1] = useState(false);
  const [opt2, setOpt2] = useState(false);
  const [opt3, setOpt3] = useState(false);
  const [opt4, setOpt4] = useState(false);
  const [mques, setMques] = useState(``);
  const [opt1Data, setOption1Data] = useState(``);
  const [opt2Data, setOption2Data] = useState(``);
  const [opt3Data, setOption3Data] = useState(``);
  const [opt4Data, setOption4Data] = useState(``);
  // const [questionshow, setQuestionShow] = useState("Add Question");
  const [questionval, setQuestionVal] = useState(``);
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
        setState("");
        setQuestion(res.data);
        if (res.data.answer === "null") {
          ansVal.null = "null";
        } else {
          const str = res.data.answer;
          ansVal = JSON.parse(str.substring(1, str.length - 1));
        }
        if (res.data.question === "null") {
          quesData = {};
        } else {
          const str = res.data.question;
          quesData = JSON.parse(str.substring(1, str.length - 1));
          setMques(quesData.question2);
          setOption1Data(quesData.optiona);
          setOption2Data(quesData.optionb);
          setOption3Data(quesData.optionc);
          setOption4Data(quesData.optiond);
          // setQuestionVal(quesData.question1);
        }
      })
      .catch((e) => console.log(e));
  }, [bookid, quesnode, accesstoken, state]);
  const handleAddQuestion = () => {
    quesData.type = "paragraph";
    quesData.question1 = questionval;
    let data = "null";
    data = JSON.stringify(JSON.stringify(quesData));
    let content = {
      question: data,
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}/question`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        setShowEdit(false);
        setQuestionVal("");
        setState(res);
        setChstate(res);
        ansVal = {};
      })
      .catch((e) => console.log(e));
  };
  const handleAddMcq = () => {
    quesData.type = "mcq";
    quesData.question2 = mques;
    quesData.optiona = opt1Data;
    quesData.optionb = opt2Data;
    quesData.optionc = opt3Data;
    quesData.optiond = opt4Data;
    // console.log(question.answer);
    let data = "null";
    data = JSON.stringify(JSON.stringify(quesData));
    // console.log(data);

    let content = {
      question: data,
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/node/${quesnode}/question`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        ansVal = {};
        setShowMultiple(false);
        // quesData = {};
        setState(res);
        setMcqQues(false);
        setOpt1(false);
        setOpt2(false);
        setOpt3(false);
        setOpt4(false);
        setChstate(res);
      })
      .catch((e) => console.log(e));
  };
  const math = String.raw`${quesData.question1}`;
  const mcqQuestion = String.raw`${mques}`;
  const opta = String.raw`${opt1Data}`;
  const optb = String.raw`${opt2Data}`;
  const optc = String.raw`${opt3Data}`;
  const optd = String.raw`${opt4Data}`;
  const resQues = String.raw`${quesData.question2}`;
  const resopta = String.raw`${quesData.optiona}`;
  const resoptb = String.raw`${quesData.optionb}`;
  const resoptc = String.raw`${quesData.optionc}`;
  const resoptd = String.raw`${quesData.optiond}`;
  if (!quesData.type) {
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
            <h4
              onClick={() => setShowMultiple(true)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Add Multiple Choice Question
            </h4>
          </div>
        </div>
        {showMultiple && (
          <div className="question__editor">
            <div className="question__mcq">
              <h4 onClick={() => setMcqQues(true)}>
                {mcqQuestion === "" ? (
                  "Add Question"
                ) : (
                  <MathJax math={mcqQuestion} />
                )}
              </h4>
            </div>
            {mcqQues && (
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
                    // console.log(data);
                    setMques(data);
                    // console.log(mques);
                  }}
                />
                <div className="question__editorButton">
                  <button onClick={() => setMcqQues(false)}>Save</button>
                </div>
              </div>
            )}
            <div className="question__options">
              <div className="question__option question__mcq">
                <h5 onClick={() => setOpt1(true)}>
                  {opta === "" ? "Option a" : <MathJax math={opta} />}
                </h5>
              </div>
              {opt1 && (
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
                      setOption1Data(data);
                    }}
                  />
                  <div className="question__editorButton">
                    <button onClick={() => setOpt1(false)}>Save</button>
                  </div>
                </div>
              )}
              <div className="question__option question__mcq">
                <h5 onClick={() => setOpt2(true)}>
                  {optb === "" ? "Option b" : <MathJax math={optb} />}
                </h5>
              </div>
              {opt2 && (
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
                      setOption2Data(data);
                    }}
                  />
                  <div className="question__editorButton">
                    <button onClick={() => setOpt2(false)}>Save</button>
                  </div>
                </div>
              )}
              <div className="question__option question__mcq">
                <h5 onClick={() => setOpt3(true)}>
                  {optc === "" ? "Option c" : <MathJax math={optc} />}
                </h5>
              </div>
              {opt3 && (
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
                      setOption3Data(data);
                    }}
                  />
                  <div className="question__editorButton">
                    <button onClick={() => setOpt3(false)}>Save</button>
                  </div>
                </div>
              )}
              <div className="question__option question__mcq">
                <h5 onClick={() => setOpt4(true)}>
                  {optd === "" ? "Option d" : <MathJax math={optd} />}
                </h5>
              </div>
              {opt4 && (
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
                      setOption4Data(data);
                    }}
                  />
                  <div className="question__editorButton">
                    <button onClick={() => setOpt4(false)}>Save</button>
                  </div>
                </div>
              )}
            </div>
            <div className="question__editorButton">
              <button onClick={() => handleAddMcq()}>Save</button>
              <button onClick={() => setShowMultiple(false)}>Cancel</button>
            </div>
          </div>
        )}
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
                // console.log({ data });
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
  } else if (quesData.type === "paragraph") {
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
              data={quesData.question}
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
  } else if (quesData.type === "mcq") {
    return (
      <div className="question__editor">
        <div className="question__mcq">
          <h4>
            <span>Q)</span>
            <MathJax math={resQues} />
          </h4>
          <IconButton onClick={() => setMcqQues(true)}>
            <EditIcon />
          </IconButton>
        </div>
        {mcqQues && (
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
                setMques(data);
              }}
            />
            <div className="question__editorButton">
              <button onClick={() => handleAddMcq()}>Save</button>
              <button onClick={() => setMcqQues(false)}>Cancel</button>
            </div>
          </div>
        )}
        <div className="question__options">
          <div className="question__option question__mcq">
            <h5>
              <span>A) </span>
              <MathJax math={resopta} />
            </h5>
            <IconButton onClick={() => setOpt1(true)}>
              <EditIcon />
            </IconButton>
          </div>
          {opt1 && (
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
                  setOption1Data(data);
                }}
              />
              <div className="question__editorButton">
                <button onClick={() => handleAddMcq()}>Save</button>
                <button onClick={() => setOpt1(false)}>Cancel</button>
              </div>
            </div>
          )}
          <div className="question__option question__mcq">
            <h5>
              <span>B) </span>
              <MathJax math={resoptb} />
            </h5>
            <IconButton onClick={() => setOpt2(true)}>
              <EditIcon />
            </IconButton>
          </div>
          {opt2 && (
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
                  setOption2Data(data);
                }}
              />
              <div className="question__editorButton">
                <button onClick={() => handleAddMcq()}>Save</button>
                <button onClick={() => setOpt2(false)}>Cancel</button>
              </div>
            </div>
          )}
          <div className="question__option question__mcq">
            <h5>
              <span>C) </span>
              <MathJax math={resoptc} />
            </h5>
            <IconButton onClick={() => setOpt3(true)}>
              <EditIcon />
            </IconButton>
          </div>
          {opt3 && (
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
                  setOption3Data(data);
                }}
              />
              <div className="question__editorButton">
                <button onClick={() => handleAddMcq()}>Save</button>
                <button onClick={() => setOpt3(false)}>Cancel</button>
              </div>
            </div>
          )}
          <div className="question__option question__mcq">
            <h5>
              <span>D) </span>
              <MathJax math={resoptd} />
            </h5>
            <IconButton onClick={() => setOpt4(true)}>
              <EditIcon />
            </IconButton>
          </div>
          {opt4 && (
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
                  setOption4Data(data);
                }}
              />
              <div className="question__editorButton">
                <button onClick={() => handleAddMcq()}>Save</button>
                <button onClick={() => setOpt4(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default QuestionNode;
