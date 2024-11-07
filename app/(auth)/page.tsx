"use client";

import { FireIcon } from "@heroicons/react/24/solid";
import FormInput from "../components/form-input";
import { useFormState, useFormStatus } from "react-dom";
import login from "./action";
import Button from "../components/button";
import { useEffect, useState } from "react";

// 에러 타입 정의
interface FormErrors {
  email?: string[];
  username?: string[];
  password?: string[];
}

export default function Home() {
  const [state, action] = useFormState(login, null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // fieldErrors는 변수. FormErrors는 type.
  // state가 true 면 {} 빈 객체. state에 뭔가 있으면 state?.fieldErrors
  const fieldErrors: FormErrors =
    state !== true ? state?.fieldErrors || {} : {};

  useEffect(() => {
    if (state === true) {
      console.log(isSuccess);
      setIsSuccess(true);
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <FireIcon className="size-16 text-[#FC7D7B]" />
      <form action={action} className=" flex flex-col gap-2">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
          required
          errors={fieldErrors?.email ?? []}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="닉네임을 입력하세요."
          required
          errors={fieldErrors?.username ?? []}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
          errors={fieldErrors?.password ?? []}
        />
        <Button isSuccess={isSuccess} />
      </form>
    </div>
  );
}
