import getSession from "@/lib/session";

export default async function profile() {
  const cookie = await getSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-96 mx-auto text-5xl">
      {cookie.username}의 프로필🌝
    </div>
  );
}
