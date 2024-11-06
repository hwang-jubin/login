"use client";

import { FireIcon } from "@heroicons/react/24/solid";
import FormInput from "../components/form-input";
import { useFormState } from "react-dom";
import login from "./action";

export default function Home() {
  const [state, action] = useFormState(login, null);
  console.log(state);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <FireIcon className="size-16 text-[#FC7D7B]" />
      <form action={action} className=" flex flex-col gap-2">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
        />
        <FormInput
          name="username"
          type="text"
          placeholder="닉네임을 입력하세요."
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          errors={state?.fieldErrors.password}
        />

        <button className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">
          제출
        </button>
      </form>
    </div>
  );
}
