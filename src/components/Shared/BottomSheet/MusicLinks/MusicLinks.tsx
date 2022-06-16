import React from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import {
  openMusicLinks,
  openVideo,
} from "src/redux/createSlice/bottomSheetSlice";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import { ContributeDataType } from "../../Types/BottomSheetDataTypes";
import CommomSocialsLinks from "../CommonSocialsLinks/CommomSocialsLinks";
import Styles from "../Socials/Socials.module.scss";

const MusicLinks = () => {
  const musicLinksData: ContributeDataType[] = [
    {
      icon_link: "/assets/icons/music.svg",
      bgColor: "white",
      href: "",
      name: "Apple Music",
    },
    {
      icon_link: "/assets/icons/spotify.svg",
      bgColor: "white",
      href: "",
      name: "Spotify",
    },
    {
      icon_link: "/assets/icons/sound_cloud.svg",
      bgColor: "white",
      href: "",
      name: "Sound Cloud",
    },
    {
      icon_link: "/assets/icons/youtubesBg.svg",
      bgColor: "white",
      href: "",
      name: "Youtube Music",
    },
    {
      icon_link: "/assets/icons/amazon.svg",
      bgColor: "white",
      href: "",
      name: "Amazon Music",
    },
    {
      icon_link: "/assets/icons/tidal.svg",
      bgColor: "white",
      href: "",
      name: "Tidal",
    },
    {
      icon_link: "/assets/icons/amazon.svg",
      bgColor: "white",
      href: "",
      name: "Amazon Music",
    },
    {
      icon_link: "/assets/icons/tidal.svg",
      bgColor: "white",
      href: "",
      name: "Tidal",
    },
  ];
  const { height } = useWindowDimensions();
  const Data = useGroupData(musicLinksData, height < 500 ? 4 : 6);
  return (
    <div className={Styles.socialsContainer}>
      <BottomSheetBtnTop title="Music Links" actions={openMusicLinks} />
      <CommomSocialsLinks data={Data} />
      <BottomSheetButton actions={openVideo} />
    </div>
  );
};

export default MusicLinks;
