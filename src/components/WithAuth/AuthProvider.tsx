import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { userAuthReducer } from "src/redux/createSlice/userSlice";
import { Loader } from "../common/Loader/Loader";
import { GET_USER_BY_TOKEN } from "../graphql/query";

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

  const { id, email, username } = data?.getUserByToken || {};
  if (id && email && username) {
    dispatch(userAuthReducer(true));
  }

  return children;
};

export default AuthProvider;
