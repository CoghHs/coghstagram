import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import useUser from "../../lib/client/useUser";

const Profile: NextPage = () => {
  const { user } = useUser();
  return (
    <Layout hasTabBar title="cogh">
      <div className="mt-20">
        <div className="flex items-center mt-4 space-x-3">
          {user?.avatar ? (
            <img
              src={`https://imagedelivery.net/2D7iuynfofPUs7N3pYD8rA/${user?.avatar}/avatar`}
              className="w-16 h-16 bg-slate-500 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-slate-500 rounded-full" />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{user?.name}</span>
            <Link legacyBehavior href="/profile/edit">
              <a className="text-sm text-gray-700">Edit profile &rarr;</a>
            </Link>
          </div>
          <div className="flex space-x-16">
            <div className="flex flex-col text-center ml-28">
              <span className="font-medium text-gray-900 text-sm">29</span>
              <span className="text-sm text-gray-700">게시물</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-medium text-gray-900 text-sm">29</span>
              <span className="text-sm text-gray-700">좋아요</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="font-medium text-gray-900 text-sm">29</span>
              <span className="text-sm text-gray-700">댓글</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
