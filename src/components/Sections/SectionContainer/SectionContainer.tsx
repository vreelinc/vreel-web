import React, { CSSProperties, ReactNode } from "react";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";
import { useAppDispatch } from "src/redux/store/store";
import Styles from "./SectionContainer.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import useWindowDimensions from "@hooks/useWindowDimensions";

const SectionContainer: React.FC<{
  children: ReactNode;
  title: string;
  parentSwiper?: any;
}> = ({ children, title, parentSwiper }) => {
  const dispatch = useAppDispatch();
  const { height } = useWindowDimensions();

  return (
    <div
      className={Styles.sectionContainer}
      style={{ "--height": height / 100 } as CSSProperties}
    >
      <div className={Styles.sectionContainer__container}>
        <div className={Styles.sectionContainer__container__buttonTopContainer}>
          <h2>{title}</h2>
          <div onClick={() => dispatch(expandMenu())}>
            <HiOutlineMenu
              className={
                Styles.sectionContainer__container__buttonTopContainer__menu
              }
            />
          </div>
        </div>
        <div className={Styles.sectionContainer__container__childrenContainer}>
          {children}
        </div>

        {parentSwiper?.activeIndex !==
          parseInt(parentSwiper?.slides?.length) - 1 && (
          <div
            className={
              Styles.sectionContainer__container__buttonBottomContainer
            }
            onClick={() => parentSwiper.slideNext()}
          >
            <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionContainer;
