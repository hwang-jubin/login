"use server";

import db from "@/lib/db";
import z from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password == confirm_password;
};

const formSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    username: z.string().trim().max(5, { message: "5자 이하로 적어주세요" }),
    password: z
      .string()
      .min(4, "비밀번호는 최소 10자 이상이어야 합니다.")
      .regex(/\d/, "비밀번호에는 최소 1개의 숫자가 포함되어야 합니다."),
    confirm_password: z.string().min(4),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export default async function createAccount(
  prevState: any,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        password: hashedPassword,
        email: result.data.email,
      },
      select: {
        id: true,
      },
    });

    const cookie = await getSession();
    cookie.id = user.id;
    await cookie.save();

    redirect(`/profile`);
  }
}
