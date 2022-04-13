import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./BookDetail.css";

function BookDetail({ bookdetail, setChstate, bookid }) {
  const [{ accesstoken, userRole }] = useStateValue();
  const [editInp, setEditInp] = useState(true);
  const [btn, setBtn] = useState(false);
  const [title, setTitle] = useState(bookdetail.title);
  const [author, setAuthor] = useState(bookdetail.author);
  const [isbn, setIsbn] = useState(bookdetail.isbn);
  const [description, setDescription] = useState(bookdetail.description);
  const [publisher, setPublisher] = useState(bookdetail.publisher);
  const [board, setBoard] = useState(bookdetail.board);
  const [subject, setSubject] = useState(bookdetail.subject);
  const [classes, setClasses] = useState(bookdetail.class);
  const [lang, setLang] = useState(bookdetail.lang);
  const [type, setType] = useState(bookdetail.type);
  const [edition, setEdition] = useState(bookdetail.edition);
  const [cover, setCover] = useState(bookdetail.cover);
  const history = useHistory();
  const EditBook = () => {
    setBtn(true);
    setEditInp(false);
  };
  const CancelEdit = () => {
    setBtn(false);
    setEditInp(true);
  };
  const editBook = () => {
    let content = {
      author: author,
      board: board,
      class: classes,
      cover: cover,
      description: description,
      edition: edition,
      isbn: isbn,
      lang: lang,
      other_tags: bookdetail.other_tags,
      published: bookdetail.published,
      publisher: publisher,
      subject: subject,
      title: title,
      type: type,
    };
    axios({
      method: "put",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}`,
      data: content,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        setChstate(res);
        setBtn(false);
        setEditInp(true);
      })
      .catch((e) => console.log(e));
  };
  const deleteBook = () => {
    if (window.confirm("Are you sure you want to delete this book")) {
      axios({
        method: "delete",
        url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}`,
        headers: {
          "Content-Type": "application/json",
          accesstoken: accesstoken,
        },
      })
        .then((res) => {
          console.log(res);
          history.push("/");
        })
        .catch((e) => console.log(e));
    } else {
      console.log("saved");
    }
  };
  return (
    <div className="bookDetail">
      {userRole === "admin" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={() => deleteBook()} className="delete__btn">
            Delete
          </button>
          <button onClick={() => EditBook()}>Edit</button>
        </div>
      )}
      <p>Book title</p>
      <input
        className="bookDetail__data"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={editInp}
      />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "70%", marginRight: "1.2rem" }}>
          <p>Book authors</p>
          <input
            className="bookDetail__data"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={editInp}
          />
        </div>
        <div style={{ width: "30%" }}>
          <p>ISBN</p>
          <input
            className="bookDetail__data"
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            disabled={editInp}
          />
        </div>
      </div>
      <br />
      <p>Book description</p>
      <input
        className="bookDetail__data"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={editInp}
      />
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "70%", marginRight: "1.2rem" }}>
          <p>Publisher</p>
          <input
            className="bookDetail__data"
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            disabled={editInp}
          />
        </div>
        <div style={{ width: "30%" }}>
          <p>Type</p>
          <input
            className="bookDetail__data"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={editInp}
          />
        </div>
      </div>
      <br />
      <div>
        <p>Edition</p>
        <input
          className="bookDetail__data"
          type="text"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
          disabled={editInp}
        />
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%", marginRight: "1.2rem" }}>
          <p>Board</p>
          <input
            className="bookDetail__data"
            type="text"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            disabled={editInp}
          />
        </div>
        <div style={{ width: "50%" }}>
          <p>Subject</p>
          <input
            className="bookDetail__data"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={editInp}
          />
        </div>
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%", marginRight: "1.2rem" }}>
          <p>Class</p>
          <input
            className="bookDetail__data"
            type="text"
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            disabled={editInp}
          />
        </div>
        <div style={{ width: "50%" }}>
          <p>Language</p>
          <input
            className="bookDetail__data"
            type="text"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            disabled={editInp}
          />
        </div>
      </div>
      <br />
      <p>Cover url</p>
      <input
        className="bookDetail__data"
        type="text"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
        disabled={editInp}
      />
      <br />
      <br />
      {btn && (
        <div className="book__detailFooter">
          {" "}
          <button onClick={() => editBook()}>Submit</button>{" "}
          <button onClick={() => CancelEdit()}>Cancel</button>{" "}
        </div>
      )}
    </div>
  );
}

export default BookDetail;
