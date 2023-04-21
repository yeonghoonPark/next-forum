import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (
      req.body.name === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "빈 칸 없이 입력하세요." });
    }

    const db = (await connectDB).db("forum");
    const check = await db.collection("user_cred").find().toArray();

    console.log(check, "체크");

    const testResult = check.some((cV) => {
      return cV.email === req.body.email;
    });

    console.log(testResult, "테스트");

    if (testResult) {
      return res
        .status(400)
        .json({ success: false, message: "중복 된 아이디입니다." });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    req.body.role = "normal";
    console.log(req.body.role, "바디 롤");
    const result = await db.collection("user_cred").insertOne(req.body);

    res.status(200).redirect(302, "/");
  }
}
