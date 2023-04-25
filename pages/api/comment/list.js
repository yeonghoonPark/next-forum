import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = await req.query;
    const db = (await connectDB).db("forum");
    const commentResult = await db
      .collection("comment")
      .find({ parent: query._id })
      .toArray();

    // const commentResult = totalComment.filter(
    //   (cV) => body.parent === cV.parent,
    // );

    res.status(200).json({ success: true, data: commentResult });
  }
}
