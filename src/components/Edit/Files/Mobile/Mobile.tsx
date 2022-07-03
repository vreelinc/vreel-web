import React from "react";
import clsx from "clsx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import Styles from "./Mobile.module.scss";

import { RootState, useAppDispatch } from "@redux/store/store";
import { showMobilePreview } from "@redux/createSlice/createMenuSlice";
import File from "../File/File";
import Players from "../Players/Players";
import UploadBtn from "@shared/Buttons/UploadBtn/UploadBtn";
import { gql, useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";

const SCHEMAS = gql`
  query ($token: String!) {
    getUserByToken(token: $token) {
      files {
        file_count
        files {
          id
          file_name
          file_type
          uri
        }
      }
    }
  }
`;

const Mobile = () => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const userFiles = useQuery(SCHEMAS, {
    variables: {
      token: cookies.userAuthToken,
    },
  });

  const { mobilePreviewInitialState, showPreviewInitialState } = useSelector(
    (state: RootState) => state.expandMenu
  );

  let len = showPreviewInitialState.payload?.length ? true : false;
  const dispatch = useAppDispatch();
  return (
    <div className={Styles.filesMobileVersion}>
      <div
        className={clsx(
          Styles.previewMobile,
          mobilePreviewInitialState ? Styles.active : Styles.deactive
        )}
      >
        <div className={Styles.icons}>
          <div
            className={Styles.hideIcon}
            onClick={() => {
              dispatch(showMobilePreview(false));
            }}
          >
            <IoIosCloseCircleOutline />
          </div>
          {len ? (
            <Players mobilePreview={mobilePreviewInitialState} />
          ) : (
            <div className={Styles.mobilePrevText}>
              Don't Have any {showPreviewInitialState.type}
            </div>
          )}
        </div>
      </div>

      <div className={Styles.filesMobileVersion__content}>
        <UploadBtn />
        <div className={Styles.filesMobileVersion__content__uploadMessage}>
          <p>Upload Images, Videos, Audio For Your VREEL</p>
          <div
            className={
              Styles.filesMobileVersion__content__uploadMessage__success
            }
          >
            <img src="/assets/icons/checkmark.svg" alt="Check Mark" />
            <p>3 files uploaded successfully!</p>
          </div>
        </div>
        <File userFiles={userFiles} />
      </div>
    </div>
  );
};

export default Mobile;
