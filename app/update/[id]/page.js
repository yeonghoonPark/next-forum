// "use client";

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
// import { useEffect, useState } from "react";

export default async function Update(props) {
  // const [inputVal, setInputVal] = useState("");
  // const [textareaVal, setTextareaVal] = useState("");

  // useEffect(async () => {
  //   const db = (await connectDB).db("forum");
  //   const result = await db.collection("post").findOne({
  //     _id: new ObjectId(props.params.id),
  //   });

  //   setInputVal(result.title);
  //   setTextareaVal(result.contnet);
  // }, []);

  const db = (await connectDB).db("forum");
  const result = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div className='p-20'>
      <h4>글 수정</h4>
      <form action='/api/post/update' method='POST'>
        <input
          style={{ display: "none" }}
          name='_id'
          defaultValue={result._id.toString()}
        />
        <input name='title' defaultValue={result.title} />
        <textarea name='content' defaultValue={result.content} />
        <button type='submit'>수정완료</button>
      </form>
    </div>
  );
}
