import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { GET_USER_BY_USER_NAME } from "src/components/graphql/query";
import VreelSlider from "../components/VreelSlider/VreelSlider";
const userPage = () => {
  const router = useRouter();
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: username,
    },
  });

  if (loading || error) return <div>Loading...</div>;
  if (!data) {
    router.push("/");
  }
  return (
    <div>
      <Head>
        <title>{`${username}'s`} VReel</title>
      </Head>
      <VreelSlider data={data} view="Desktop" />
    </div>
  );
};

export default userPage;
