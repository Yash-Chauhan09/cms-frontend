import React, { useState } from "react";
import "./BookDetail.css";

function BookDetail({ bookdetail }) {
  const [user, setUser] = useState("");
  const handleDisabale = () => {
    if (user === "") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="bookDetail">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p>Book type: </p>
        <input type="radio" id="html" name="fav_language" value="Textbook" /> 
        <label htmlFor="Textbook">Textbook</label>
          <input type="radio" id="css" name="fav_language" value="Exams" /> 
        <label htmlFor="Exams">Exams</label>
        <input
          type="radio"
          id="Tests"
          name="fav_language"
          value="Tests"
        />  <label htmlFor="Tests">Tests</label>
      </div>
      <br />
      <p>Book title</p>
      <input
        className="bookDetail__data"
        type="text"
        defaultValue={bookdetail.title}
        disabled={handleDisabale()}
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
            defaultValue={bookdetail.author}
            disabled={handleDisabale()}
          />
        </div>
        <div style={{ width: "30%" }}>
          <p>ISBN</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={bookdetail.isbn}
            disabled={handleDisabale()}
          />
        </div>
      </div>
      <br />
      <p>Book description</p>
      <input
        className="bookDetail__data"
        type="text"
        defaultValue={bookdetail.description}
        disabled={handleDisabale()}
      />
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "70%", marginRight: "1.2rem" }}>
          <p>Publisher</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={bookdetail.publisher}
            disabled={handleDisabale()}
          />
        </div>
        <div style={{ width: "30%" }}>
          <p>Publish year</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={bookdetail.published}
            disabled={handleDisabale()}
          />
        </div>
      </div>
      <br />
      <div>
        <p>Edition (optional)</p>
        <input
          className="bookDetail__data"
          type="text"
          defaultValue={bookdetail.edition}
          disabled={handleDisabale()}
        />
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Visibility of questions: </p>
        <input type="radio" id="html" name="fav_language" value="Yes" /> 
        <label htmlFor="Yes">Yes</label>
          <input type="radio" id="css" name="fav_language" value="No" /> 
        <label htmlFor="No">No</label>
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%", marginRight: "1.2rem" }}>
          <p>Board</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={bookdetail.board}
            disabled={handleDisabale()}
          />
        </div>
        <div style={{ width: "50%" }}>
          <p>Subject</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={bookdetail.subject}
            disabled={handleDisabale()}
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
            defaultValue={bookdetail.class}
            disabled={handleDisabale()}
          />
        </div>
        <div style={{ width: "50%" }}>
          <p>Language</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={bookdetail.lang}
            disabled={handleDisabale()}
          />
        </div>
      </div>
      <br />
      <div>
        <p>Topic (optional)</p>
        <input
          className="bookDetail__data"
          type="text"
          defaultValue={"Accounting"}
          disabled={handleDisabale()}
        />
      </div>
    </div>
  );
}

export default BookDetail;
