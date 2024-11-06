import { FireIcon } from "@heroicons/react/24/solid";
import FormInput from "../components/form-input";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <FireIcon className="size-16 text-[#FC7D7B]" />
      <FormInput />

      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
