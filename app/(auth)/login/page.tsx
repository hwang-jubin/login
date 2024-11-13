"use client";

import { FireIcon } from "@heroicons/react/24/solid";
import FormInput from "../../components/form-input";
import { useFormState } from "react-dom";

import Button from "../../components/button";

import login from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <FireIcon className="size-16 text-[#FC7D7B]" />
      <form action={action} className=" flex flex-col gap-2">
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력하세요."
          required
          errors={state?.fieldErrors?.email ?? []}
        />

        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
          errors={state?.fieldErrors?.password ?? []}
        />

        <Button />
      </form>
    </div>
  );
}
