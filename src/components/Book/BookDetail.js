import React from "react";
import "./BookDetail.css";

function BookDetail() {
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
        <label for="Textbook">Textbook</label>
          <input type="radio" id="css" name="fav_language" value="Exams" /> 
        <label for="Exams">Exams</label>
        <input
          type="radio"
          id="Tests"
          name="fav_language"
          value="Tests"
        />  <label for="Tests">Tests</label>
      </div>
      <br />
      <p>Book title</p>
      <input
        className="bookDetail__data"
        type="text"
        defaultValue={"Zzzz- Automation Test (PLEASE dont delete it)"}
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
            defaultValue={"Not Applicable"}
          />
        </div>
        <div style={{ width: "30%" }}>
          <p>ISBN</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={"12345678900"}
          />
        </div>
      </div>
      <br />
      <p>Book description</p>
      <input
        className="bookDetail__data"
        type="text"
        defaultValue={"Book for automation test."}
      />
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "70%", marginRight: "1.2rem" }}>
          <p>Publisher</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={"NaN"}
          />
        </div>
        <div style={{ width: "30%" }}>
          <p>Publish year</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={"2021"}
          />
        </div>
      </div>
      <br />
      <div>
        <p>Edition (optional)</p>
        <input
          className="bookDetail__data"
          type="text"
          defaultValue={"Enter edition"}
        />
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Visibility of questions: </p>
        <input type="radio" id="html" name="fav_language" value="Yes" /> 
        <label for="Yes">Yes</label>
          <input type="radio" id="css" name="fav_language" value="No" /> 
        <label for="No">No</label>
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%", marginRight: "1.2rem" }}>
          <p>Board</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={"College"}
          />
        </div>
        <div style={{ width: "50%" }}>
          <p>Subject</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={"Biology"}
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
            defaultValue={"Biology"}
          />
        </div>
        <div style={{ width: "50%" }}>
          <p>Language</p>
          <input
            className="bookDetail__data"
            type="text"
            defaultValue={"English"}
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
        />
      </div>
    </div>
  );
}

export default BookDetail;
