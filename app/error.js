"use client";

export default function Error({ error, reset }) {
  console.log(error, "에러");
  console.log(reset, "리셋");
  return (
    <div>
      <h4>에러났습니다.</h4>
      <button type='text' onClick={() => reset()}>
        리셋
      </button>
    </div>
  );
}
