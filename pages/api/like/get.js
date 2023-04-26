import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const db = (await connectDB).db("forum");

  const result = await db
    .collection("like")
    .find({ like_post_id: new ObjectId(req.query._id) })
    .toArray();

  const checkUser = result.some((cV) => cV.email === session?.user.email);
  res.status(200).json({ success: true, data: result, check: checkUser });
}
