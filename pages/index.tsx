import React from "react";
import Layout from "../components/layout";
import { NextPage } from "next";
import HomeLayout from "../components/HomeLayout";
import { Tweet } from "@prisma/client";
import useSWR from "swr";

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithCount[];
}

interface TweetWithCount extends Tweet {
  _count: {
    favs: number;
  };
}

const Home: NextPage = () => {
  const { data } = useSWR<TweetsResponse>("/api/tweet");
  return (
    <div>
      <Layout title="홈" hasTabBar>
        <HomeLayout data={data?.tweets} />
      </Layout>
    </div>
  );
};

export default Home;
