"use client";

import { FireIcon } from "@heroicons/react/24/solid";
import FormInput from "../../components/form-input";
import { useFormState } from "react-dom";

import Button from "../../components/button";

import createAccount from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  // fieldErrors는 변수. FormErrors는 type.
  // state가 true 면 {} 빈 객체. state에 뭔가 있으면 state?.fieldErrors
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {/* <FireIcon className="size-16 text-[#FC7D7B]" /> */}
      <div className="text-2xl">🥰 회원가입 🥰</div>
      <form action={action} className=" flex flex-col gap-2">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
          required
          errors={state?.fieldErrors.email ?? []}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="닉네임을 입력하세요."
          required
          errors={state?.fieldErrors.username ?? []}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
          errors={state?.fieldErrors.password ?? []}
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="비밀번호를 확인하세요."
          required
          errors={state?.fieldErrors.confirm_password ?? []}
        />

        <Button />
      </form>
    </div>
  );
}
