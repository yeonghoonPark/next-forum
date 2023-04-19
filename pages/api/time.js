export default function getTime(req, res) {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const secondes = date.getSeconds();

  return res
    .status(200)
    .json({ success: true, data: `${hours}시 ${minutes}분 ${secondes}초` });
}
