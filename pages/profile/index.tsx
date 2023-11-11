import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import useUser from "../../lib/client/useUser";
import useMutation from "../../lib/client/useMutation";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/Button";
import { TweetsResponse } from "..";
import useSWR from "swr";
import ProfileLayout from "../../components/ProfileLayout";

const Profile: NextPage = () => {
  const { data } = useSWR<TweetsResponse>("/api/tweet");
  const { user } = useUser();
  const [mutation] = useMutation("/api/logout");
  const router = useRouter();
  const onLogOut = () => {
    toast.success("다음에 또 봐요 !");
    mutation(user);
    router.push("/login");
  };

  return (
    <Layout hasTabBar title="cogh">
      <div className="mt-20">
        <div className=" mt-4 space-x-3 flex border-b py-4">
          {user?.avatar ? (
            <img
              src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${user?.avatar}/bigavatar`}
              className="w-28 h-28 bg-slate-500 rounded-full"
            />
          ) : (
            <div className="w-28 h-28 bg-slate-500 rounded-full" />
          )}
          <div className="flex items-center space-x-10 ">
            <div className="ml-24">
              <span className=" text-xl text-gray-900">{user?.name}</span>
            </div>
            <Link legacyBehavior href="/profile/edit">
              <a className="text-sm text-gray-700">
                <Button text="프로필 편집"></Button>
              </a>
            </Link>
            <div>
              <button
                className="w-full bg-gray-900 hover:bg-gray-700 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium  focus:outline-none py-2 text-sm
              "
                onClick={onLogOut}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
        <div>
          <ProfileLayout data={data?.tweets} currentUser={user} />
        </div>

        <div>
          <Toaster />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
