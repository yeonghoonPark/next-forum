import { connectDB } from "@/util/database";
// import Link from "next/link";
// import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  console.log(result, "리설트");

  return (
    <div className='list-bg'>
      <ListItem result={result} />
    </div>
  );
}
