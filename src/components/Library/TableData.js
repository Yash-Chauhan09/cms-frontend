import React from "react";
import { Link } from "react-router-dom";

function TableData({
  img,
  bookName,
  isbn,
  board,
  classes,
  subject,
  language,
  id,
}) {
  return (
    <tr className="library__data">
      <Link
        style={{ color: "#000", textDecoration: "none" }}
        to={`/library/${id}`}
      >
        <td className="library__tableBody library__tableImg">
          <img
            src={`https://drive.google.com/u/3/uc?id=${img}&export=download`}
            alt="t"
          />
          <span>{bookName}</span>
        </td>
      </Link>
      <td className="library__tableBody">{isbn}</td>
      <td className="library__tableBody">{board}</td>
      <td className="library__tableBody">{classes}</td>
      <td className="library__tableBody">{subject}</td>
      {/* <td className="library__tableBody">{country}</td> */}
      <td className="library__tableBody">{language}</td>
    </tr>
  );
}

export default TableData;
