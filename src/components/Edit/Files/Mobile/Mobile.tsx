import React from 'react';
import clsx from 'clsx';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Styles from './Mobile.module.scss';

import { RootState, useAppDispatch } from '@redux/store/store';
import { showMobilePreview } from '@redux/createSlice/createMenuSlice';
import File from '../File/File';
import Players from '../Players/Players';
import UploadBtn from '@shared/Buttons/UploadBtn/UploadBtn';

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
