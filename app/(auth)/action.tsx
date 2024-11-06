import z from "zod";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  username: z
    .string({
      required_error: "Password is required",
    })
    .max(10, { message: "10자 이하로 적어주세요" }),
  password: z
    .string()
    .refine((password) => password === "12345", "비밀번호가 틀렸습니다"),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    // 검증 통과 후 처리
    return result.error.flatten();
  }
}
