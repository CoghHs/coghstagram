import { UseFormRegisterReturn } from "react-hook-form";

// 인풋 만들기

interface InputProps {
  name: string;
  kind?: "text" | "password" | "email";
  register: UseFormRegisterReturn;
  type: string;
  required: boolean;
}

export default function Input({
  name,
  kind = "text",
  register,
  type,
  required,
}: InputProps) {
  return (
    <div>
      {kind === "text" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder="사용자 이름"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
      ) : null}
      {kind === "email" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder="이메일"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
      ) : null}
      {kind === "password" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder="비밀번호"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
      ) : null}
    </div>
  );
}
