"use client";

import { SessionProvider } from "next-auth/react";

export default function RegisterLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
