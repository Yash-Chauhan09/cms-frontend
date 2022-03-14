import React, { useState } from "react";
import "./Progress.css";
import img from "../images/loginImage.svg";
import Checkbox from "@mui/material/Checkbox";
import { MoreVertOutlined } from "@material-ui/icons";

function Progress() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="progress">
      <div className="progress__left">
        <div className="progress__detail">
          <div className="progress__detail-left">
            <p>Book's fulfilment</p>
            <h2>0/4</h2>
          </div>
          <div className="progress__detail-right">
            <img src={img} alt="illustration" />
          </div>
        </div>
        <form className="progress__info">
          <div className="progress__infoCard">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <div className="profress__infoDetail">
              <h2>Table of content (TOC)</h2>
              <p>Draft: 130 contect nodes</p>
              <p>To publish: 0/130 content nodes</p>
            </div>
          </div>
          <div className="progress__infoCard">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <div className="profress__infoDetail">
              <h2>Table of content (TOC)</h2>
              <p>Draft: 130 contect nodes</p>
              <p>To publish: 0/130 content nodes</p>
            </div>
          </div>
          <div className="progress__infoCard">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <div className="profress__infoDetail">
              <h2>Table of content (TOC)</h2>
              <p>Draft: 130 contect nodes</p>
              <p>To publish: 0/130 content nodes</p>
            </div>
          </div>
          <div className="progress__infoCard">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <div className="profress__infoDetail">
              <h2>Table of content (TOC)</h2>
              <p>Draft: 130 contect nodes</p>
              <p>To publish: 0/130 content nodes</p>
            </div>
          </div>
        </form>
      </div>
      <div className="progress__right">
        <div className="progress__rightTop">
          <h5>Publishing status</h5>
          <MoreVertOutlined style={{ color: "rgba(110, 108, 108, 0.658)" }} />
        </div>
        <div className="progress__body">
          <h2>
            The Book is not <br /> published
          </h2>
          <button>Publish book</button>
        </div>
      </div>
    </div>
  );
}

export default Progress;
