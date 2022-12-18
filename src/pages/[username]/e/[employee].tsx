import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GET_USER_BY_USER_NAME, GET_ENTERPRISE_EMPLOYEE, GET_PAGE_SECURITY } from "@graphql/query";
// import BottomSheetSlide from '@shared/BottomSheet/BottomSheetContainer/BottomSheetSlide';
import Sections from "src/components/Sections/Sections";
import { Loader } from "@shared/Loader/Loader";
import { setVreel, setVreelMetadata } from "@redux/createSlice/vreelSlice";
import { useDispatch } from "react-redux";
import CustomHead from "@shared/meta/MetaTags";
import { client } from "@graphql/index";

const userPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, employee } = router?.query;

  const { loading, error, data } = useQuery(GET_ENTERPRISE_EMPLOYEE, {
    variables: {
      enterpriseName: username,
      employeeId: employee,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading || error) return <Loader />;


  if (!data) {
    router.push("/");
  } else {
    dispatch(setVreel(data?.enterpiseEmployee?.vreel));
    dispatch(setVreelMetadata({ employee: data?.enterpiseEmployee?.employee.id }))

  }

  return (
    <div>
      {/* <CustomHead title={`${username}'s VReel`} /> */}
      <Sections
        enterprise={{
          companyName: data?.enterpiseEmployee.companyName, default_landscape: data?.enterpiseEmployee.default_landscape,
          default_portrait: data?.enterpiseEmployee.default_portrait,
        }}
        vreel={data?.enterpiseEmployee?.vreel}
        user={data?.enterpiseEmployee?.employee}
      />
    </div>
  );
};

export default userPage;


// export const getServerSideProps = async ({ params }) => {
//   const { employee } = params;
//   const result = await client.query({
//     query: GET_PAGE_SECURITY,
//     variables: { id: employee, context: "employee" }
//   })

//   console.log(result)

//   return {
//     props: {
//       result
//     }
//   }
// }
