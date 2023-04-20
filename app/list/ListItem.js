"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DetailLink from "./DetailLink";

export default function ListItem({ result }) {
  // clinet component에서 DB가져오는 방법
  // 단점 : 검색노출이 어려울 수 있다.(검색엔진 봇이 정보 수집 못함)
  // 이유 : HTML부분을 렌더링 한 후에 useEffect가 실행되기 때문
  useEffect(() => {}, []);

  const router = useRouter();

  const onHandleDelete = (id) => {
    fetch("/api/post/delete", {
      method: "DELETE",
      // body: "서버로 보내고싶은 것",
      // 만약 array나 object를 보내고 싶다면 아래의 형식으로 보내야한다.
      // 이유 : 서버와 데이터를 주고 받을 땐 문자나 숫자밖에 주고 받을 수 없다,
      // 그런 연유로 {name:"kim"} => {"name":"kim"}으로 변환해주는 방식
      // 반대로 JSON을 array나 object로 변환시키고 싶을 땐 JSON.parse()를 사용한다.
      body: JSON.stringify({ _id: id }),
    })
      // 서버에서 응답을 받은 후에 실행하는 코드
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          // 서버가 에러코드 전송시 실행할 코드, 즉 status가 200이 아닐시
        }
      })
      // 성공시 실행 할 코드
      .then((res) => {
        console.log(res);
        alert("Post has been deleted");
        router.refresh();
      })
      // 인터넷 문제로 실패시 실행 할 코드
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {result.map((cV) => {
        return (
          <div key={cV._id} className='list-item'>
            <Link href={`/detail/${cV._id}`} prefetch={false}>
              <h4>{cV.title}</h4>
            </Link>
            <p>{cV.content}</p>
            <div
              style={{
                display: "flex",
                gap: "8px",
                margin: "8px 0",
              }}
            >
              <DetailLink href={`/detail/${cV._id}`} message='보기' />
              <DetailLink href={`/update/${cV._id}`} message='수정' />

              <span
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={() => {
                  onHandleDelete(cV._id);

                  // query로 데이터 전송하는 법
                  // 장점 : GET요청인데도 데이터를 전송할 수 있다.
                  // 단점 : 길고 복잡한건 가시성이 떨어진다, 민감한 정보는 넣으면 안된다.
                  // fetch("/api/test?name=kim&age=20");
                  // fetch(`/api/post/delete?_id=${cV._id}`)
                  //   .then((res) => res.json())
                  //   .then((res) => {
                  //     console.log(res);
                  //     alert("Post has been deleted");
                  //     router.refresh();
                  //   })
                  //   .catch((err) => {
                  //     console.error(err);
                  //   });

                  // URL parameter 문법
                  // fetch(`/api/abc/_id=${cV._id}`)
                  //   .then((res) => res.json())
                  //   .then((res) => {
                  //     console.log(res);
                  //     alert("Post has been deleted");
                  //     router.refresh();
                  //   })
                  //   .catch((err) => {
                  //     console.error(err);
                  //   });
                }}
              >
                🗑
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
