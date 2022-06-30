import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GET_USER_BY_USER_NAME, GET_ENTERPRISE_EMPLOYEE } from "@graphql/query";
// import BottomSheetSlide from '@shared/BottomSheet/BottomSheetContainer/BottomSheetSlide';
import Sections from "src/components/Sections/Sections";
import { Loader } from "@shared/Loader/Loader";
import { setVreel } from "@redux/createSlice/vreelSlice";
import { useDispatch } from "react-redux";

const userPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, employee } = router?.query;
  console.log(router);

  const { loading, error, data } = useQuery(GET_ENTERPRISE_EMPLOYEE, {
    variables: {
      enterpriseName: username,
      employeeId: employee,
    },
    fetchPolicy: "cache-and-network",
  });
  // console.log({ data, username });
  if (loading || error) return <Loader />;
  if (error) {
    console.log({ error });
  }

  if (!data) {
    router.push("/");
  } else {
    dispatch(setVreel(data?.enterpiseEmployee?.vreel));
  }
  console.log(data);

  return (
    <div>
      <Head>
        <title>{`${username}'s`} VReel</title>
      </Head>
      <Sections
        vreel={data?.enterpiseEmployee?.vreel}
        user={data?.enterpiseEmployee?.employee}
      />
    </div>
  );
};

export default userPage;
