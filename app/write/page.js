"use client";

import { useState } from "react";

export default function Write() {
  const [inputVal, setInputVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");

  const onHandleChangeInput = (e) => {
    setInputVal(e.currentTarget.value);
  };

  const onHandleChangeTextarea = (e) => {
    setTextareaVal(e.currentTarget.value);
  };

  const onHandleBtn = (e) => {
    // e.preventDefault();
    // let variables = {
    //   title: inputVal,
    //   content: textareaVal,
    // };
    // axios.post("/api/write", variables);
  };

  return (
    <div className='p-20'>
      <h4>Write</h4>
      <form action='/api/post/new' method='POST'>
        <input
          name='title'
          placeholder='title'
          value={inputVal}
          onChange={onHandleChangeInput}
        />

        <textarea
          name='content'
          placeholder='content'
          value={textareaVal}
          onChange={onHandleChangeTextarea}
        />
        <button type='submit' onClick={onHandleBtn}>
          완료
        </button>
      </form>
    </div>
  );
}
