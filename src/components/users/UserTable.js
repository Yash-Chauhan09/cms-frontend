import React from "react";

function UserTable({ email, role }) {
  return (
    <tr style={{ cursor: "pointer" }} className="library__data">
      <td className="library__tableBody library__tableImg">{email}</td>
      <td className="library__tableBody">{role}</td>
    </tr>
  );
}

export default UserTable;
