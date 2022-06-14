import React from "react";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import Styles from "./Socials.module.scss";

const Socials: React.FC<{ setOpen: Function }> = ({ setOpen }) => {
  return (
    <div className={Styles.socialsContainer}>
      <BottomSheetBtnTop title="Socials" />
      <div className={Styles.socialsContainer__socials}>
        <h1>Follow Me</h1>
        <div className={Styles.socialsContainer__socials__iconsContainer}>
          {[
            {
              icon_link: "/assets/images/instagram.svg",
              bgColor: "#F00073",
              name: "Instagram",
            },
            {
              icon_link: "/assets/images/twitter.svg",
              bgColor: "#1DA1F2",
              name: "Twitter",
            },
            {
              icon_link: "/assets/images/youtube.svg",
              bgColor: "#FF0000",
              name: "Youtube",
            },
            {
              icon_link: "/assets/images/twitch.svg",
              bgColor: "#9146FF",
              name: "Twitch",
            },
            {
              icon_link: "/assets/images/snapChat.svg",
              bgColor: "#FAFF00",
              name: "SnapChat",
            },
          ].map((item, index) => (
            <div key={index}>
              <div
                className={
                  Styles.socialsContainer__socials__iconsContainer__icons
                }
                style={{ backgroundColor: `${item.bgColor}` }}
              >
                <img src={item.icon_link} alt="Social Icons" />
              </div>
              <p
                className={
                  Styles.socialsContainer__socials__iconsContainer__iconsName
                }
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <BottomSheetButton setOpen={setOpen} title="Events" />
    </div>
  );
};

export default Socials;
