import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session, "세션");

  if (req.method === "DELETE" || req.method === "GET") {
    // console.log(req.body, "바디");

    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(JSON.parse(req.body)._id) });

    // console.log(result, "리설트");

    console.log(result?.author, "아서");
    console.log(session.user.email, "유저이메일");

    if (session.user.role === "admin") {
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(JSON.parse(req.body)._id) });
      res.status(200).json({
        success: true,
        message: "게시물이 정상적으로 삭제되었습니다.",
      });
    } else if (result?.author !== session.user.email) {
      return res
        .status(400)
        .json({ success: false, message: "작성자만 글을 지울 수 있습니다." });
    }

    try {
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(JSON.parse(req.body)._id) });

      if (result.deletedCount === 0) {
        return res.status(500).json({
          success: false,
          message: "게시물이 삭제 되지 않았습니다, 관리자에게 문의하세요.",
        });
      }

      res.status(200).json({
        success: true,
        message: "게시물이 정상적으로 삭제되었습니다.",
      });
    } catch (err) {
      console.error(err);
    }

    // query 방식
    // try {
    //   const db = (await connectDB).db("forum");
    //   const result = await db
    //     .collection("post")
    //     .deleteOne({ _id: new ObjectId(req.query._id) });
    //   if (result.deletedCount === 0) {
    //     return res.status(500).json({
    //       success: false,
    //       message: "게시물이 삭제 되지 않았습니다, 관리자에게 문의하세요.",
    //     });
    //   }
    //   res.status(200).json({
    //     success: true,
    //     message: "게시물이 정상적으로 삭제되었습니다.",
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  }
}
