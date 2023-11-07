import React from "react";
import Layout from "../components/layout";
import { NextPage } from "next";

const Home: NextPage = () => (
  <div>
    <Layout title="홈" hasTabBar>
      <h1 className="text-3xl">Hello</h1>
    </Layout>
  </div>
);

export default Home;
