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

const Create: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [mutaion, { loading, data }] = useMutation("/api/create-account");
  const router = useRouter();
  const onValid = async (validForm: IForm) => {
    if (loading) return;
    mutaion(validForm);
  };
  useEffect(() => {
    if (data?.status === 201) {
      toast.success(data?.message);
      router.push("/login");
    }
  }, [data]);
  return (
    <div>
      <div className="mt-16 px-4 border-gray-300 border p-10">
        <div className="flex justify-center flex-col items-center">
          <header className="border-b-2">
            <Image src={smlogo} alt="logo" width={260} height={100} />
            <h1 className=" py-8">코흐스타그램을 이용하기 위해 가입하세요.</h1>
          </header>
          <form
            onSubmit={handleSubmit(onValid)}
            className="w-72 space-y-5 mt-5"
          >
            <div>
              <Input
                register={register("name", {
                  required: "이름을 입력해주세요.",
                })}
                name="name"
                type="text"
                kind="text"
                required
              ></Input>
              <span className="text-sm text-gray-600">
                {errors.name?.message}
              </span>
            </div>
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
                계정을 생성하고 코흐스타그램을 이용해보세요.
              </span>
            </div>
            <Button text={loading ? "로딩중" : "가입"}></Button>
          </form>
        </div>
      </div>
      <div className="mt-4 px-4 border-gray-300 border p-10">
        <div className="flex justify-center">
          <span>계정이 있으신가요?</span>
          <Link href="/login" legacyBehavior>
            <a className="text-sky-500 ml-1">로그인</a>
          </Link>
        </div>
        <div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};
export default Create;
