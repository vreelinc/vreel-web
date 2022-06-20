import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GET_USER_BY_USER_NAME } from "src/components/graphql/query";
import BottomSheetSlide from "src/components/Shared/BottomSheet/BottomSheetContainer/BottomSheetSlide";

const userPage = () => {
  const router = useRouter();
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: username,
    },
    fetchPolicy: "cache-and-network",
  });
  // console.log({ data, username });
  if (loading || error) return <div>Loading...</div>;
  if (!data) {
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>{`${username}'s`} VReel</title>
      </Head>
      <BottomSheetSlide data={data} />
    </div>
  );
};

export default userPage;
