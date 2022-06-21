import React from "react";
import PreviewSliders from "../PreviewSliders/PreviewSliders";
import Styles from "./MobilePreview.module.scss";

const MobilePreview = () => {
  return (
    <div className={Styles.showMobilePreview}>
      {/* {mediaSlidePreviewLink.link.length ? (
        <div className={Styles.showMobilePreview__bgImg}>
          <img src={mediaSlidePreviewLink.link} alt="Slides Images" />
        </div>
      ) : (
        <div className={Styles.showMobilePreview__text}>
          <h3>Preview</h3>
        </div>
      )} */}
      <PreviewSliders view="Mobile" />
    </div>
  );
};

export default MobilePreview;
