import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE" || req.method === "GET") {
    // body 방식
    try {
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(JSON.parse(req.query)._id) });

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
