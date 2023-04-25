import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인이 필요합니다.</div>;
  } else {
    return (
      <div className='p-20'>
        <h4>Write</h4>
        <form action='/api/post/new' method='POST'>
          <input
            name='author'
            defaultValue={session.user.email}
            style={{ display: "none" }}
          />
          <input name='title' placeholder='title' />
          <textarea name='content' placeholder='content' />
          <button type='submit'>완료</button>
        </form>
      </div>
    );
  }
}
