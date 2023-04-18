"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function DetailLink({ href }) {
  const router = useRouter();

  // current url
  const pathname = usePathname();

  // query string
  const searchParams = useSearchParams();

  // console.log(pathname, "패스네임");
  // console.log(searchParams, "서치파람스");

  const onHandleBtn = () => {
    router.push(href);
  };

  return <button onClick={onHandleBtn}>버튼</button>;
}
