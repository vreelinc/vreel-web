import React from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { userAuthReducer } from "@redux/createSlice/userSlice";

import { Loader } from "@shared/Loader/Loader";
import { GET_USER_BY_TOKEN } from "@graphql/query";
import MainContainer from "@sections/MainContainer/MainContainer";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["userAuthToken"]);
  const { loading, error, data } = useQuery(GET_USER_BY_TOKEN, {
    variables: {
      token: cookies?.userAuthToken,
    },
  });

  if (loading) {
    return <Loader />;
  }

  const { id, email, username, vreel } = data?.getUserByToken || {};
  console.log({ vreel });

  if (id && email && username) {
    dispatch(
      userAuthReducer({
        authenticated: true,
        user: {
          id: "1234",
          email,
          username,
          vreel: vreel,
          token: cookies?.userAuthToken,
        },
      })
    );
  }

  return children;
};

export default AuthProvider;
