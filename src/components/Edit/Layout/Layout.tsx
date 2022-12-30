import { useQuery } from "@apollo/client";
import SecureRoute from "@auth/SecureRoute/SecureRoute";
import { GET_PAGES_BY_TOKEN } from "@graphql/query";
import { setEditorPages } from "@redux/createSlice/editorSlice";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import DesktopDashboard from "./Desktop/DesktopDashboard";
import MobileDashboard from "./Mobile/MobileDashboard";

const EditorLayout: React.FC<{ userId: string; children: React.ReactNode }> = ({
  userId,
  children,
}) => {
  return (
    <>
      <DesktopDashboard children={children} />
      <MobileDashboard children={children} />
    </>
  );
};

export default EditorLayout;
