import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import VreelSlider from "../components/VreelSlider/VreelSlider";
const userPage = () => {
  const router = useRouter();
  const { username } = router?.query;
  return (
    <div>
      <Head>
        <title>{`${username}'s`} VReel</title>
      </Head>
      <VreelSlider isUserName="username" view="Desktop" />
    </div>
  );
};

export default userPage;
