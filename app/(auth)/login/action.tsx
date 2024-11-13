"use server";

import db from "@/lib/db";
import z from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "@/app/atoms/atoms";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string({ required_error: "이메일을 입력해주세요" })
    .email()
    .toLowerCase()
    .refine(async (email) => {
      return await checkEmailExists(email);
    }, "등록된 이메일이 없습니다."),

  password: z.string({ required_error: "비밀번호를 입력해주세요" }).trim(),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: {
        id: true,
        password: true,
        username: true,
      },
    });

    const compare = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxx"
    );

    if (compare) {
      const cookie = await getSession();
      cookie.id = user?.id;
      cookie.username = user?.username;
      await cookie.save();

      //   const [username, setUsername] = useRecoilState(userAtom);
      //   setUsername({ username: user!.username });
      //   console.log(username);

      redirect(`/profile`);
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }
  }
}
