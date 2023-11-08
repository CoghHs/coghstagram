import React from "react";
import Layout from "../components/layout";
import { NextPage } from "next";
import HomeLayout from "../components/HomeLayout";
import { Tweet } from "@prisma/client";
import useSWR from "swr";
import Item from "../components/Item";
import tweet from "./api/tweet";

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithCount[];
}

interface TweetWithCount extends Tweet {
  _count: {
    favs: number;
  };
}

const TEST_DATA = [
  { id: 1, title: "title1", content: "123", bg: 100 },
  { id: 2, title: "title2", content: "123", bg: 200 },
  { id: 3, title: "title3", content: "123", bg: 400 },
  { id: 4, title: "title3", content: "123", bg: 400 },
  { id: 5, title: "title3", content: "123", bg: 500 },
  { id: 6, title: "title3", content: "123", bg: 600 },
  { id: 7, title: "title3", content: "123", bg: 700 },
  { id: 8, title: "title3", content: "123", bg: 800 },
];
const Home: NextPage = () => {
  const { data } = useSWR<TweetsResponse>("/api/tweet");
  return (
    <div>
      <Layout title="홈" hasTabBar>
        <HomeLayout data={data?.tweets} />
        {data?.tweets?.map((tweets) => (
          <div key={tweets.id}>{tweets.name}</div>
        ))}
      </Layout>
    </div>
  );
};

export default Home;
