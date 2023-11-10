import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import smlogo from "../image/logo.png";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";

interface IForm {
  name: string;
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [mutaion, { loading, data }] = useMutation("/api/login");
  const router = useRouter();
  const onValid = async (validForm: IForm) => {
    if (loading) return;
    await mutaion(validForm);
  };
  useEffect(() => {
    if (data?.status === 200) {
      toast.success("환영합니다!");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    }
    if (data?.status === 404) {
      toast.error(data?.message);
    }
    if (data?.status === 401) {
      toast.error(data?.message);
    }
  }, [data]);
  return (
    <div>
      <div className="mt-16 px-4 border-gray-300 border p-10">
        <div className="flex justify-center flex-col items-center">
          <header className="border-b-2">
            <Image src={smlogo} alt="logo" width={260} height={100} />
          </header>
          <form
            onSubmit={handleSubmit(onValid)}
            className="w-72 space-y-5 mt-5"
          >
            <div>
              <Input
                register={register("email", {
                  required: "이메일을 입력해주세요.",
                  validate: {
                    email: (value) =>
                      value.includes("@") || "이메일 형식으로 작성해주세요.",
                  },
                })}
                name="email"
                type="email"
                kind="email"
                required
              ></Input>
              <span className="text-sm text-gray-600">
                {errors.email?.message}
              </span>
            </div>
            <div>
              <Input
                register={register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 6,
                    message: "6자리 이상 입력해주세요.",
                  },
                })}
                name="password"
                type="password"
                kind="password"
                required
              ></Input>
              <span className="text-sm text-gray-600">
                {errors.password?.message}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-sm text-gray-600">
                이메일과 비밀번호를 입력하여 로그인하세요.
              </span>
            </div>
            <Button text={loading ? "잠시만 기다려주세요." : "로그인"}></Button>
          </form>
        </div>
      </div>
      <div className="mt-4 px-4 border-gray-300 border p-10">
        <div className="flex justify-center">
          <span className="">계정이 없으신가요?</span>
          <Link href="/create-account" legacyBehavior>
            <a className="text-sky-500 ml-1">가입하기</a>
          </Link>
        </div>
        <div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};
export default Login;
