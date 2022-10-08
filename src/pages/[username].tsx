import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GET_USER_BY_USER_NAME } from "@graphql/query";
// import BottomSheetSlide from '@shared/BottomSheet/BottomSheetContainer/BottomSheetSlide';
import Sections from "src/components/Sections/Sections";
import { Loader } from "@shared/Loader/Loader";
import { useDispatch } from "react-redux";
import { setVreel } from "@redux/createSlice/vreelSlice";

const userPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: username,
    },
    fetchPolicy: "cache-and-network",
  });
  // console.log({ data, username });
  if (loading || error) return <Loader />;


  if (!data) {
    router.push("/");
  } else {
    dispatch(setVreel(data?.username?.vreel));
  }
  const user = data?.username
  const metaName = user?.companyName !== "" ? user?.companyName : user?.username;
  const metaImageSrc = user?.vreel?.display_options?.default_logo !== "" ? user?.vreel?.display_options?.default_logo : "/icons/Vreel_logo_small.svg"


  return (
    <div>
      <Head>
        <title>{`${metaName}'s`} VReel</title>
        <meta property="og:image" content={metaImageSrc} />
      </Head>
      <Sections vreel={data?.username?.vreel} />
    </div>
  );
};

export default userPage;
