import z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .endsWith("@zod.com", "@zod.com으로 끝내는 email을 입력하세요"),
  username: z.string().max(5, { message: "5자 이하로 적어주세요" }),
  password: z
    .string()
    .min(10, "비밀번호는 최소 10자 이상이어야 합니다.")
    .regex(/\d/, "비밀번호에는 최소 1개의 숫자가 포함되어야 합니다."),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    // 검증 통과 후 처리

    const a = result.error.flatten();

    return result.error.flatten();
  } else {
    return result.success;
  }
}
