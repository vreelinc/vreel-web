import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import PreviewSliders from "../PreviewSliders/PreviewSliders";
import Styles from "./DesktopPreview.module.scss";

type Props = {};

const DesktopPreview = (props: Props) => {
  return (
    <div className={Styles.showDesktopPreview}>
      {/* {mediaSlidePreviewLink.link.length ? (
        <div className={Styles.showDesktopPreview__bgImg}>
          <img src={mediaSlidePreviewLink.link} alt="Slides Images" />
        </div>
      ) : (
        <div className={Styles.showDesktopPreview__text}>
          <h3>Preview</h3>
        </div>
      )} */}
      <PreviewSliders view="Desktop" />
    </div>
  );
};

export default DesktopPreview;
