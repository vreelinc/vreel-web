import clsx from "clsx";
import React from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import {
  openEvents,
  openSocials,
} from "src/redux/createSlice/bottomSheetSlice";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import Styles from "./Socials.module.scss";

const Socials = () => {
  const data = [
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
  ];
  const { height } = useWindowDimensions();
  const Data = useGroupData(data, height > 450 && height < 500 ? 4 : 6);
  const len = data.length - 1;

  return (
    <div className={Styles.socialsContainer}>
      <BottomSheetBtnTop title="Socials" actions={openSocials} />
      <div className={Styles.socialsContainer__socials}>
        <h1>Follow Me</h1>
        <div className={Styles.socialsContainer__socials__iconsContainer}>
          {data.map((item, index) => (
            <div
              key={index}
              className={clsx(
                index === len &&
                  len % 2 === 0 &&
                  Styles.socialsContainer__socials__iconsContainer__fullRow
              )}
            >
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
      <BottomSheetButton actions={openEvents} title="Events" />
    </div>
  );
};

export default Socials;
