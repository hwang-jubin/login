"use client";

import { EnvelopeIcon } from "@heroicons/react/24/solid";

export default function FormInput() {
  return (
    <div className="relative w-96">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full pl-12 pr-4 py-2 rounded-full border-2 border-neutral-200"
      />
      <EnvelopeIcon className="absolute size-7 left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}
