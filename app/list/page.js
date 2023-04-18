import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  const createHTML = () => {
    return result.map((cV) => {
      return (
        <div key={cV._id} className='list-item'>
          <Link href={`/detail/${cV._id}`} prefetch={false}>
            <h4>{cV.title}</h4>
          </Link>
          <DetailLink href={`/detail/${cV._id}`} />
          <p>{cV.content}</p>
        </div>
      );
    });
  };

  return <div className='list-bg'>{createHTML()}</div>;
}
