import { connectDB } from "@/util/database";

export default async function getList(req, res) {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();
  // console.log(result);
  return res.status(200).json({ success: true, data: result });
}
