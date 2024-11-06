"use client";

import { EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

type IconName = "email" | "username" | "password";

// IconName의 type에 value는 JSX.Element
const icon: Record<IconName, JSX.Element> = {
  email: (
    <EnvelopeIcon className="absolute size-7 left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
  ),
  username: (
    <UserIcon className="absolute size-7 left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
  ),
  password: (
    <KeyIcon className="absolute size-7 left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
  ),
};

export default function FormInput({
  name,
  errors,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative w-96">
      <input
        name={name}
        {...rest}
        className="w-full pl-12 pr-4 py-2 rounded-full border-2 border-neutral-200"
      />
      {icon[name as IconName] || null}
    </div>
  );
}
