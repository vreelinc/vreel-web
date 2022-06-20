import React, { ReactNode } from "react";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";
import { useAppDispatch } from "src/redux/store/store";
import Styles from "./BottomSheetContainer.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import useWindowDimensions from "src/hooks/useWindowDimensions";

const BottomSheetContainer: React.FC<{
  children: ReactNode;
  title: string;
  parentSwiper?: any;
}> = ({ children, title, parentSwiper }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.sheetContainer}>
      <div className={Styles.sheetContainer__container}>
        <div className={Styles.sheetContainer__container__buttonTopContainer}>
          <h2>{title}</h2>
          <button></button>
          <div onClick={() => dispatch(expandMenu())}>
            <HiOutlineMenu
              className={
                Styles.sheetContainer__container__buttonTopContainer__menu
              }
            />
          </div>
        </div>
        <div className={Styles.sheetContainer__container__childrenContainer}>
          {children}
        </div>

        {parentSwiper?.activeIndex !==
          parseInt(parentSwiper?.slides?.length) - 1 && (
          <div
            className={Styles.sheetContainer__container__buttonBottomContainer}
            onClick={() => parentSwiper.slideNext()}
          >
            <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomSheetContainer;
