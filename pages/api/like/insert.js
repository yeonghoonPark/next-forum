import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const db = (await connectDB).db("forum");

      if (!session) {
        return res
          .status(200)
          .json({ success: false, data: "로그인 후 이용해주세요" });
      }

      const obj = {
        name: session.user.name,
        email: session.user.email,
        like_post_id: new ObjectId(req.body),
      };

      // 이미 like를 눌렀다면?
      const totalLike = await db
        .collection("like")
        .find({ like_post_id: new ObjectId(req.body) })
        .toArray();
      const checkLike = totalLike.some((cV) => cV.email === session.user.email);

      if (checkLike) {
        const result = await db
          .collection("like")
          .deleteOne({
            email: session.user.email,
            like_post_id: new ObjectId(req.body),
          });
        return res.status(200).json({ success: true, data: "좋아요-1" });
      }

      // 만약 dislike를 누른상황에서 like를 누르면
      const totlaDislike = await db
        .collection("dislike")
        .find({ dislike_post_id: new ObjectId(req.body) })
        .toArray();
      const checkDislike = totlaDislike.some(
        (cV) => cV.email === session.user.email,
      );

      if (checkDislike) {
        await db
          .collection("dislike")
          .deleteOne({
            email: session.user.email,
            dislike_post_id: new ObjectId(req.body),
          });
        await db.collection("like").insertOne(obj);
        return res
          .status(200)
          .json({ success: true, data: "싫어요-1, 좋아요+1" });
      }

      // 아무것도 안눌린 상황
      const result = await db.collection("like").insertOne(obj);
      res.status(200).json({ success: true, data: "좋아요+1" });
    } catch (err) {
      console.error(err);
    }
  }
}
