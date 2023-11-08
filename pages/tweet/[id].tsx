import type { NextPage } from "next";
import Button from "../../components/Button";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { User } from "@prisma/client";
import useMutation from "../../lib/client/useMutation";
import { cls } from "../../lib/client/utils";

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
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />

            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.tweet?.user?.name}
              </p>
              <Link
                legacyBehavior
                href={`/users/profiles/${data?.tweet?.user?.id}`}
              >
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.tweet?.content}
            </h1>

            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedtweets.map((tweet) => (
              <Link key={tweet.id} href={`/products/${tweet.id}`}>
                <div className="h-56 w-full mb-4 bg-slate-300" />
                <h3 className="text-gray-700 -mb-1">{tweet.name}</h3>
              </Link>
            ))}
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default ItemDetail;
