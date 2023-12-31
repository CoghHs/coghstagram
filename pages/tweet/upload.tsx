import type { NextPage } from "next";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import useMutation from "../../lib/client/useMutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomUser from "../../components/CustomUser";

interface UploadTweetForm {
  name: string;
  content: string;
  photo: FileList;
}

type Tweet = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  image?: string;
  name: string;
  content: string;
};
interface UploadTweetMutation {
  ok: boolean;
  tweet: Tweet;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadTweetForm>();
  const [uploadTweet, { loading, data }] =
    useMutation<UploadTweetMutation>("/api/tweet");
  const onValid = async ({ name, photo, content }: UploadTweetForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", photo[0], name);
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      uploadTweet({ name, photo, content, photoId: id });
    } else {
      uploadTweet({ name, photo, content });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/tweet/${data.tweet.id}`);
    }
  }, [data, router]);
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);
  return (
    <Layout canGoBack hasTabBar title="Upload Product">
      <CustomUser />
      <form
        onSubmit={handleSubmit(onValid)}
        className="p-4 space-y-4 mt-20 px-10"
      >
        <div>
          {photoPreview ? (
            <img
              src={photoPreview}
              className="w-full text-gray-600 h-46 rounded-md"
            />
          ) : (
            <label className="w-full cursor-pointer text-gray-600 hover:border-black hover:text-black flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                {...register("photo")}
                accept="image/*"
                className="hidden"
                type="file"
              />
            </label>
          )}
        </div>
        <Input
          register={register("name", { required: true })}
          required
          kind="title"
          name="title"
          type="text"
        />
        <Input
          register={register("content", { required: true })}
          required
          kind="content"
          name="content"
          type="text"
        />
        <Button text={loading ? "로딩중" : "게시글 작성"} />
      </form>
    </Layout>
  );
};

export default Upload;
