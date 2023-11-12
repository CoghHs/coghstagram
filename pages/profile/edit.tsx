import type { NextPage } from "next";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/layout";

import useUser from "../../lib/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "../../lib/client/useMutation";
import CustomUser from "../../components/CustomUser";

interface IForm {
  name?: string;
  email?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  errer?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<IForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user?.email);
    if (user?.name) setValue("name", user?.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${user?.avatar}/avatar`
      );
  }, [user]);
  const [editProfile, { loading }] =
    useMutation<EditProfileResponse>(`/api/profile`);
  const onValid = async ({ email, name, avatar }: IForm) => {
    if (loading) return;
    if (email === "" && name === "") {
      return setError("formErrors", {
        message: "이름을 변경해주세요.",
      });
    }
    if (avatar && avatar.length > 0 && user?.id) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfile({
        email,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        name,
      });
    }
  };
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack hasTabBar title="Edit Profile">
      <CustomUser />
      <form className=" space-y-4 mt-32" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full object-contain"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          name="name"
          type="text"
          kind="text"
          required={false}
        ></Input>

        {errors.formErrors ? (
          <span className="text-sm block my-4">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "로딩중" : "업데이트"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
