"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Comment({ result }) {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [commentVal, setCommentVal] = useState("");
  const [isTest, setIsTest] = useState(false);

  const onHandleSubmit = () => {
    if (commentVal === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({
        content: commentVal,
        parent: result?._id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === false) {
          setCommentVal("");
          alert(json.data);
          return;
        }
        setIsTest(!isTest);
        setCommentVal("");
        alert(json.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch(`/api/comment/list?_id=${result?._id}`)
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
        console.log(json.data);
      });
  }, [isTest]);

  return (
    <div>
      <div>댓글</div>
      <input
        value={commentVal}
        placeholder='댓글 추가...'
        onChange={(e) => setCommentVal(e.target.value)}
      />
      <button onClick={onHandleSubmit}>Submit</button>

      {list.length > 0 ? (
        list.map((cV) => {
          return (
            <div
              key={cV?._id}
              style={{ border: "1px solid black", margin: "1rem 0" }}
            >
              <h5 style={{ margin: "4px 0" }}>{cV?.name}</h5>
              <p style={{ margin: "4px 0" }}>{cV?.content}</p>
            </div>
          );
        })
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
}
