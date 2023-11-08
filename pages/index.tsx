import React from "react";
import Layout from "../components/layout";
import { NextPage } from "next";
import HomeLayout from "../components/HomeLayout";

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
const Home: NextPage = () => (
  <div>
    <Layout title="홈" hasTabBar>
      {/* <h1 className="text-3xl">Hello</h1> */}
      <HomeLayout data={TEST_DATA} />
    </Layout>
  </div>
);

export default Home;
