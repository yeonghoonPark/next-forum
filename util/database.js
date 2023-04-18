import { MongoClient } from "mongodb";
const url = `${process.env.NEXT_PUBLIC_MONGODB}`;
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  // 개발모드일 땐 global._mongo라는 변수를 만들어서 connectDB로 재사용하라는 의미
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
  // 개발모드가 아닐 경우
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
