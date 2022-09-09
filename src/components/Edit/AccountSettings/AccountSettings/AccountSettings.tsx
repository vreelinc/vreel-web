import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_DATA } from "@graphql/query";
import React from "react";
import { useCookies } from "react-cookie";
import DesktopSettings from "../DesktopSetting/DesktopSettings";
import PersonalInfo from "../PersonalInfo/PersonalInfo";

const AccountSettings = () => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const { data } = useQuery(GET_ACCOUNT_DATA, { variables: { token: cookies.userAuthToken } });
  return (
    <div>
      {data &&
        <DesktopSettings data={data?.getUserByToken} />
      }
      <PersonalInfo />
    </div>
  );
};

export default AccountSettings;
