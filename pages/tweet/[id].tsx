import type { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";
import useMutation from "../../lib/client/useMutation";
import { cls } from "../../lib/client/utils";
import CustomUser from "../../components/CustomUser";

type Tweet = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  image?: string;
  name: string;
  content: string;
};
interface TweetWithUser extends Tweet {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  tweet: TweetWithUser;
  relatedtweets: Tweet[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/tweet/${router.query.id}/fav`);

  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !data.isLiked }, false);
    toggleFav({});
  };

  return (
    <Layout hasTabBar canGoBack>
      <CustomUser />
      <div className="px-4  py-4 ">
        <div className="mb-8 ">
          {data?.tweet.image ? (
            <div className="flex justify-center items-center">
              <img
                src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${data?.tweet.image}/public`}
                className=" bg-slate-300 "
              />
            </div>
          ) : (
            <div className="h-96 bg-white flex items-center justify-center font-bold text-xl"></div>
          )}
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            {data?.tweet.user.avatar ? (
              <img
                src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${data?.tweet.user.avatar}/avatar`}
                className="w-12 h-12 rounded-full bg-slate-300"
              />
            ) : (
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-slate-300"></div>
              </div>
            )}

            <div className="flex items-center">
              <p className=" font-bold text-gray-700">
                {data?.tweet?.user?.name}
              </p>
              <div></div>
              <div className="flex items-center ml-[300px]">
                <button
                  onClick={onFavClick}
                  className={cls(
                    "p-3 rounded-md flex items-center justify-center ",
                    data?.isLiked
                      ? "text-red-400 hover:text-red-500 hover:bg-gray-100"
                      : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  )}
                >
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill={data?.isLiked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  className={
                    "p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  }
                >
                  <svg
                    className="h-6 w-6 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"></path>
                  </svg>
                </button>
                <button
                  className={
                    "p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  }
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-2xl font-semibold text-gray-900">
              {data?.tweet?.content}
            </h1>
            <h2 className="text-lg mt-2">{data?.tweet?.name}</h2>
            <div className="flex items-center justify-between space-x-2"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
