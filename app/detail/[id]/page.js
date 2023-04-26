import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

import Comment from "./Comment";
import LikeDislike from "./LikeDislike";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(`${props.params.id}`) });

  if (result == null) {
    return notFound();
  }

  return (
    <div>
      <h1>상세페이지</h1>
      <div style={{ border: "1px solid black", padding: "1rem" }}>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        <LikeDislike result={result} />
      </div>
      <Comment result={result} />
    </div>
  );
}
