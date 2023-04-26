"use client";

import { useEffect, useState } from "react";

export default function LikeDislike({ result }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const [isLikeVote, setIsLikeVote] = useState(false);
  const [isDisikeVote, setIsDislikeVote] = useState(false);

  const getLikeData = () => {
    fetch(`/api/like/get?_id=${result?._id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data, "라이크데이터");
        setLike(res.data.length);
        setIsLikeVote(res?.check);
      })
      .catch((err) => console.error(err));
  };

  const getDisLikeData = () => {
    fetch(`/api/dislike/get?_id=${result?._id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data, "디스라이크데이터");
        setDislike(res.data.length);
        setIsDislikeVote(res?.check);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getLikeData();
    getDisLikeData();
  }, []);

  const onHandleLikeBtn = () => {
    console.log("[onHandleLikeBtn]");
    fetch("/api/like/insert", {
      method: "POST",
      body: result._id,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          return alert(res.data);
        }
        console.log(res.data, "레스 데이터");
        getLikeData();
        getDisLikeData();
      })

      .catch((err) => console.error(err));
  };

  const onHandleDislikeBtn = () => {
    console.log("[onHandleDislikeBtn]");
    fetch("/api/dislike/insert", {
      method: "POST",
      body: result._id,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          return alert(res.data);
        }
        console.log(res.data, "레스 데이터");
        getLikeData();
        getDisLikeData();
      })

      .catch((err) => console.error(err));
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <span
        style={{
          marginRight: "2rem",
          cursor: "pointer",
          color: isLikeVote ? "red" : null,
        }}
        onClick={onHandleLikeBtn}
      >
        👍 {like}
      </span>
      <span
        style={{
          cursor: "pointer",
          color: isDisikeVote ? "red" : null,
        }}
        onClick={onHandleDislikeBtn}
      >
        👎 {dislike}
      </span>
    </div>
  );
}
