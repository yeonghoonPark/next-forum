import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res
          .status(200)
          .json({ success: false, data: "로그인 후 이용해주세요" });
      }

      const body = await JSON.parse(req.body);
      const db = (await connectDB).db("forum");

      const obj = {
        content: body.content,
        author: session.user.email,
        name: session.user.name,
        parent: body.parent,
      };

      const result = await db.collection("comment").insertOne(obj);

      res
        .status(200)
        .json({ success: true, data: "댓글 등록이 완료되었습니다." });
    } catch (err) {
      console.error(err);
    }
  }
}
