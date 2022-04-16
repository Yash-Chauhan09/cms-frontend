import React, { useEffect, useState } from "react";
import "./Library.css";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import TableData from "./TableData";
import ReactPaginate from "react-paginate";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 560,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #7289DA",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 6, 3),
  },
}));
function Library() {
  const history = useHistory();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [{ accesstoken, userRole }] = useStateValue();
  const [table, setTable] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedyear, setPublishedYear] = useState("");
  const [board, setBoard] = useState("");
  const [subject, setSubject] = useState("");
  const [clas, setClas] = useState("");
  const [lang, setLang] = useState("");
  const [type, setType] = useState("");
  const [edition, setEdition] = useState("");
  const [cover, setCover] = useState("");
  const [othertag, setOtherTag] = useState("");
  const [state, setState] = useState();
  const [newUser, setNewUser] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setAuthor("");
    setBoard("");
    setClas("");
    setCover("");
    setDescription("");
    setEdition("");
    setIsbn("");
    setLang("");
    setOtherTag("");
    setPublishedYear("");
    setSubject("");
    setType("");
    setPublisher("");
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://freecoedu-cms.herokuapp.com/index",
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.error === "user not verified") {
          setNewUser(true);
        } else {
          setTable(res.data);
        }
      })
      .catch((e) => console.log(e));
  }, [accesstoken, state]);
  const [pageNumber, setPageNumber] = useState(0);
  const tablePerPage = 10;
  const pagesVisited = pageNumber * tablePerPage;

  const displayTables = table
    .slice(pagesVisited, pagesVisited + tablePerPage)
    .map((content, index) => {
      return (
        <TableData
          key={index}
          img={content.cover}
          bookName={content.title}
          isbn={content.isbn}
          board={content.board}
          classes={content.class}
          subject={content.subject}
          language={content.lang}
          id={content.bookid}
        />
      );
    });
  const pageCount = Math.ceil(table.length / tablePerPage);
  // console.log(pageCount);
  const changePages = ({ selected }) => {
    setPageNumber(selected);
  };
  const uploadBook = () => {
    // e.preventDefault();
    let content = {
      author: author,
      board: board,
      class: clas,
      cover: cover,
      description: description,
      edition: edition,
      isbn: isbn,
      lang: lang,
      other_tags: othertag,
      published: publishedyear,
      publisher: publisher,
      subject: subject,
      title: title,
      type: type,
    };
    axios({
      method: "post",
      url: "https://freecoedu-cms.herokuapp.com/index",
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        handleClose();
        setState(res);
      })
      .catch((e) => console.log(e));
  };
  if (newUser === false) {
    return (
      <div className="library">
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <form className="invitation__form">
              <h2>Upload New Book</h2>
              <div className="invitation__input">
                {" "}
                <Input
                  placeholder="Enter book name"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></Input>
                <Input
                  placeholder="Enter class"
                  type="text"
                  value={clas}
                  onChange={(e) => {
                    setClas(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="invitation__input">
                {" "}
                <Input
                  placeholder="Enter subject"
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                ></Input>
                <Input
                  placeholder="Enter board"
                  type="text"
                  value={board}
                  onChange={(e) => {
                    setBoard(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="invitation__input">
                {" "}
                <Input
                  placeholder="Enter author"
                  type="text"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                ></Input>
                <Input
                  placeholder="Enter description"
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="invitation__input">
                {" "}
                <Input
                  placeholder="Enter isbn"
                  type="text"
                  value={isbn}
                  onChange={(e) => {
                    setIsbn(e.target.value);
                  }}
                ></Input>
                <Input
                  placeholder="Enter edition"
                  type="text"
                  value={edition}
                  onChange={(e) => {
                    setEdition(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="invitation__input">
                {" "}
                <Input
                  placeholder="Enter publisher"
                  type="text"
                  value={publisher}
                  onChange={(e) => {
                    setPublisher(e.target.value);
                  }}
                ></Input>
                <Input
                  placeholder="Enter published year"
                  type="text"
                  value={publishedyear}
                  onChange={(e) => {
                    setPublishedYear(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="invitation__input">
                <Input
                  placeholder="Enter other tags"
                  type="text"
                  value={othertag}
                  onChange={(e) => {
                    setOtherTag(e.target.value);
                  }}
                ></Input>
                <Input
                  placeholder="Enter cover url"
                  type="text"
                  value={cover}
                  onChange={(e) => {
                    setCover(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="invitation__input">
                {" "}
                <Input
                  placeholder="Enter language"
                  type="text"
                  value={lang}
                  onChange={(e) => {
                    setLang(e.target.value);
                  }}
                ></Input>
                <Input
                  placeholder="Enter type"
                  type="text"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                ></Input>
              </div>
              <Button onClick={() => uploadBook()} className="submitBtn">
                Upload
              </Button>
            </form>
          </div>
        </Modal>
        <div className="library__heading">
          <h2>Library</h2>
          {userRole === "admin" && (
            <button onClick={() => setOpen(true)}>Upload Book</button>
          )}
        </div>
        <div className="library__filters">
          <div className="library__filtersSearch">
            <div className="library__input">
              <input placeholder="Search..." type="search" />
              <SearchIcon style={{ color: "grey", padding: "0.1rem" }} />
            </div>
          </div>
          <div className="library__filter">
            <div className="library__dropdown">
              <h5>Boards</h5>
              <ExpandMoreIcon style={{ color: "grey" }} />
            </div>
            <div className="library__dropdown">
              <h5>Topics</h5>
              <ExpandMoreIcon style={{ color: "grey" }} />
            </div>
            <div className="library__dropdown">
              <h5>Classes</h5>
              <ExpandMoreIcon style={{ color: "grey" }} />
            </div>
            <div className="library__dropdown">
              <h5>Subjects</h5>
              <ExpandMoreIcon style={{ color: "grey" }} />
            </div>
            <div className="library__dropdown">
              <h5>Language</h5>
              <ExpandMoreIcon style={{ color: "grey" }} />
            </div>
          </div>
        </div>
        <table className="library__table">
          <tbody>
            <tr>
              <th className="library__tableHead">Book</th>
              <th className="library__tableHead">ISBN</th>
              <th className="library__tableHead">Board</th>
              <th className="library__tableHead">Class</th>
              <th className="library__tableHead">Subject</th>
              <th className="library__tableHead">Language</th>
            </tr>
            {displayTables}
          </tbody>
        </table>
        <div className="library__foter">
          <ReactPaginate
            previousLabel={<ArrowBack />}
            nextLabel={<ArrowForward />}
            pageCount={pageCount}
            onPageChange={changePages}
            containerClassName={"paginateBtn"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            activeClassName={"paginateActive"}
            disabledClassName={"paginationDisabled"}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="library__reset">
        <h4>You have to reset your password to access library</h4>
        <button onClick={() => history.push("/reset-password")}>
          Reset Password
        </button>
      </div>
    );
  }
}

export default Library;
