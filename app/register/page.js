"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Register() {
  const session = useSession();
  const router = useRouter();

  // console.log(session);

  useEffect(() => {
    if (session.data === null || session.data === undefined) {
      return;
    }
    alert("이미 로그인 중입니다.");
    router.push("/");
  }, [session]);

  if (session.data === null || session.data === undefined) {
    return (
      <div>
        <form method='POST' action='/api/auth/signup'>
          <input name='name' type='text' placeholder='이름' />
          <input name='email' type='text' placeholder='이메일' />
          <input name='password' type='password' placeholder='비번' />
          <button type='submit'>id/pw 가입요청</button>
        </form>
      </div>
    );
  } else {
    return <div></div>;
  }
}
