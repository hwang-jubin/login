import Link from "next/link";

export default function home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 w-96 mx-auto">
      <div className="text-4xl font-extrabold">Wellcome!😄</div>
      <Link
        href="/create-account"
        className="w-full p-3 rounded-full border-2 text-center"
      >
        회원가입
      </Link>
      <Link
        className="w-full p-3 rounded-full border-2 text-center"
        href="/login"
      >
        로그인
      </Link>
    </div>
  );
}
