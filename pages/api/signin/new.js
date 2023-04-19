import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    const test = await db.collection("user").find().toArray();
    // const result = await db.collection("user").insertOne(req.body);

    if (req.body.user_id === "" || req.body.user_password === "") {
      return res
        .status(400)
        .json({ success: false, message: "빈 칸 없이 입력해주세요." });
    }

    let check = test.find((cV) => {
      return req.body.user_id === cV.user_id;
    });

    if (check) {
      return res
        .status(400)
        .json({ success: false, message: "중복 된 아이디입니다." });
    }

    try {
      await db.collection("user").insertOne(req.body);
      res.status(200).json({ success: true, message: "회원가입 완료" });
    } catch (err) {
      console.error(err);
    }
  }
}
