export default function handler(req, res) {
  // if (req.method === "POST") {
  // console.log(req.body, "바디");
  console.log(req.query, "쿼리");
  return res.status(200).json({ success: true });
  // }
}
