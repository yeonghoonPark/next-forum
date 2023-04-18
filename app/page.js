import { connectDB } from "@/util/database";

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db("forum");

  const db = (await connectDB).db("forum");

  const result = await db.collection("post").find().toArray();

  return (
    <div>
      <h1>This is Forum</h1>
      <p>{result[0]._id}</p>
      <p>{result[0].title}</p>
      <p>{result[0].content}</p>
    </div>
  );
}
