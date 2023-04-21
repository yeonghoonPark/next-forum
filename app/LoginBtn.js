"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginBtn({ session }) {
  return (
    <>
      {!session ? (
        <button type='text' onClick={() => signIn()}>
          Login
        </button>
      ) : (
        <button type='text' onClick={() => signOut()}>
          Logout
        </button>
      )}
    </>
  );
}
