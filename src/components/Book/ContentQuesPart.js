import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import ContentTable from "./ContentTable";

function ContentQuesPart({ bookid }) {
  const { quesid } = useParams();
  const [{ accesstoken }] = useStateValue();
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://freecoedu-cms.herokuapp.com/index/book/${bookid}/children/${quesid}`,
      headers: {
        "Content-Type": "application/json",
        accesstoken: accesstoken,
      },
    })
      .then((res) => {
        // console.log(res);
        setContent(res.data);
      })
      .catch((e) => console.log(e));
  }, [accesstoken, bookid, quesid]);
  return (
    <div className="toc">
      <div className="toc__top">
        <p className="toc__topHeading">Table Of Contents</p>
      </div>
      <div className="toc__body">
        {content.map((data, index) => (
          <div className="toc__data" key={index}>
            <ContentTable
              id={data.nodeid}
              chName={data.name}
              pageNo={data.page}
              type={data.type}
              parentid={data.parentid}
              question={data.question}
              answer={data.answer}
              totalNo={content.length}
              bookid={bookid}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentQuesPart;
