import React from "react";
import File from "../File/File";
import Styles from "./Mobile.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UploadBtn from "src/components/Shared/Buttons/UploadBtn/UploadBtn";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { showMobilePreview } from "src/redux/createSlice/createMenuSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Players from "../Players/Players";

const Mobile = () => {
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
      <UploadBtn />
      <File />
    </div>
  );
};

export default Mobile;
