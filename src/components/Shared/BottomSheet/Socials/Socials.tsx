import clsx from "clsx";
import React from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import {
  openEvents,
  openSocials,
} from "src/redux/createSlice/bottomSheetSlice";
import { SwiperSlide } from "swiper/react";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import SwiperSheet from "../SwiperSheet/SwiperSheet";
import Styles from "./Socials.module.scss";

const Socials = () => {
  const data = [
    {
      thumbnail: "/assets/images/instagram.svg",
      bgColor: "#F00073",
      name: "Instagram",
    },
    {
      thumbnail: "/assets/images/twitter.svg",
      bgColor: "#1DA1F2",
      name: "Twitter",
    },
    {
      thumbnail: "/assets/images/youtube.svg",
      bgColor: "#FF0000",
      name: "Youtube",
    },
    {
      thumbnail: "/assets/images/twitch.svg",
      bgColor: "#9146FF",
      name: "Twitch",
    },
    {
      thumbnail: "/assets/images/snapChat.svg",
      bgColor: "#FAFF00",
      name: "SnapChat",
    },
  ];
  const { height } = useWindowDimensions();
  const Data = useGroupData(data, height > 450 && height < 500 ? 4 : 6);
  const len = Data.length - 1;

  return (
    <div className={Styles.socialsContainer}>
      <BottomSheetBtnTop title="Socials" actions={openSocials} />
      <div className={Styles.socialsContainer__socials}>
        <h1>Follow Me</h1>
      </div>
      {/* <div className={Styles.socialsContainer__iconsContainer}>
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx(
              index === len &&
                len % 2 === 0 &&
                Styles.socialsContainer__iconsContainer__fullRow
            )}
          >
            <div
              className={Styles.socialsContainer__iconsContainer__icons}
              style={{ backgroundColor: `${item.bgColor}` }}
            >
              <img src={item.thumbnail} alt="Social Icons" />
            </div>
            <p className={Styles.socialsContainer__iconsContainer__iconsName}>
              {item.name}
            </p>
          </div>
        ))}
      </div> */}
      <SwiperSheet>
        {Data.map((obj: any, index: number) => (
          <SwiperSlide
            key={index}
            className={Styles.socialsContainer__iconsContainer}
          >
            {obj.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  background: `${item.bgColor}`,
                  width: "100%",
                  height: "100%",
                }}
                className={Styles.socialsContainer__iconsContainers__icons}
              >
                <div
                  className={
                    Styles.socialsContainer__iconsContainers__icons__imgContainer
                  }
                >
                  <img src={item.thumbnail} alt="Links Images" />
                </div>
                <p>{item.name}</p>
              </div>
            ))}
          </SwiperSlide>
        ))}
      </SwiperSheet>
      <BottomSheetButton actions={openEvents} title="Events" />
    </div>
  );
};

export default Socials;
