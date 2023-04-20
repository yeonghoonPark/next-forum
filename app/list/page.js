import { connectDB } from "@/util/database";
// import Link from "next/link";
// import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  // const createHTML = () => {
  //   return result.map((cV) => {
  //     return (
  //       <div key={cV._id} className='list-item'>
  //         <Link href={`/detail/${cV._id}`} prefetch={false}>
  //           <h4>{cV.title}</h4>
  //         </Link>
  //         <p>{cV.content}</p>
  //         <div
  //           style={{
  //             display: "flex",
  //             gap: "8px",
  //             margin: "8px 0",
  //           }}
  //         >
  //           <DetailLink href={`/detail/${cV._id}`} message='보기' />
  //           <DetailLink href={`/update/${cV._id}`} message='수정' />
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  return (
    <div className='list-bg'>
      <ListItem result={result} />
    </div>
  );
}
