import React, { useEffect, useState } from "react";
import "./Library.css";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import TableData from "./TableData";
import data from "./bookData.json";
import ReactPaginate from "react-paginate";
import { useStateValue } from "../../StateProvider";
import axios from "axios";

function Library() {
  const [{ accesstoken }] = useStateValue();
  const [table, setTable] = useState([]);

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
        console.log(res);
        setTable(res.data);
      })
      .catch((e) => console.log(e));
  }, [accesstoken]);
  const [pageNumber, setPageNumber] = useState(0);
  const [tablePerPage, setTablePerPage] = useState(4);
  const [option, setOption] = useState(4);
  const pagesVisited = pageNumber * tablePerPage;
  const handleInput = (e) => {
    const selectedOne = e.target.value;
    setOption(selectedOne);
    setTablePerPage(selectedOne);
    console.log(option);
  };
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
          // country={content.country}
          language={content.lang}
          id={content.bookid}
        />
      );
    });
  const pageCount = Math.ceil(table.length / tablePerPage);
  console.log(pageCount);
  const changePages = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="library">
      <div className="library__heading">
        <h2>Library</h2>
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
        <tr>
          <th className="library__tableHead">Book</th>
          <th className="library__tableHead">ISBN</th>
          <th className="library__tableHead">Board</th>
          <th className="library__tableHead">Class</th>
          <th className="library__tableHead">Subject</th>
          {/* <th className="library__tableHead">Country</th> */}
          <th className="library__tableHead">Language</th>
        </tr>
        {displayTables}
      </table>
      <div className="library__foter">
        <div className="library__pageCount">
          <p>Rows per page:</p>
          <select
            name="4"
            id="number"
            value={tablePerPage}
            onChange={handleInput}
          >
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
          </select>
        </div>
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
}

export default Library;
