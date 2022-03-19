import React from "react";
import "./TocCreation.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Link, useRouteMatch } from "react-router-dom";

function TocTable({
  chName,
  pageNo,
  id,
  add,
  click,
  onEdit,
  updatedId,
  cancel,
}) {
  const { url } = useRouteMatch();
  return add ? (
    <div className="toc__data">
      <div className="toc__dataLeft">
        <div className="toc__inpName">
          <h5>CH</h5>
          <input type="text" placeholder="Name" />
        </div>
        <div className="toc__inpPage">
          <input type="number" placeholder="Page" />
        </div>
      </div>
      <div className="toc__dataButton">
        <button>Save</button>
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
              <input type="text" defaultValue={chName} />
            </div>
            <div className="toc__inpPage">
              <input type="number" defaultValue={pageNo} />
            </div>
          </div>
          <div className="toc__dataButton">
            <button>Save</button>
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
            <IconButton>
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

export default TocTable;
