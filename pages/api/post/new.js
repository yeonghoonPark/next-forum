import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  // console.log(session, "세션");

  if (session) {
    req.body.author = session.user.email;
  }

  // console.log(req.body, "바디");

  if (req.method === "POST") {
    // console.log(req.body);

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").insertOne(req.body);

    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json({ message: "빈 칸 없이 입력해주세요." });
    }

    try {
      res.status(200).redirect("/list");
    } catch (err) {
      console.error(err);
    }
  }
}
