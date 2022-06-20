import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import BottomSheetContainer from "../BottomSheetContainer/BottomSheetContainer";
import CommomSocialsLinks from "../CommonSocialsLinks/CommomSocialsLinks";

const Socials: React.FC<{ parentSwiper: any; socials: any }> = ({
  parentSwiper,
  socials,
}) => {
  const data = socials?.map((e) => {
    switch (e.platform) {
      case "facebook":
        return {
          icon_link: "/assets/images/instagram.svg",
          bgColor: "#F00073",
          name: "Instagram",
          href: `https://www.facebook.com/${e.username}`,
        };
      case "twitter":
        return {
          icon_link: "/assets/images/twitter.svg",
          bgColor: "#1DA1F2",
          name: "Twitter",
          href: `https://twitter.com/${e.username}`,
        };
      case "youtube":
        return {
          icon_link: "/assets/images/youtube.svg",
          bgColor: "#FF0000",
          name: "Youtube",
          href: `https://www.youtube.com/${e.username}`,
        };
      case "twitch":
        return {
          icon_link: "/assets/images/twitch.svg",
          bgColor: "#9146FF",
          name: "Twitch",
          href: `https://www.instagram.com/${e.username}`,
        };
      case "snapChat":
        return {
          icon_link: "/assets/images/snapChat.svg",
          bgColor: "#FAFF00",
          name: "SnapChat",
          href: `https://www.instagram.com/${e.username}`,
        };
      default:
        return {};
    }
  });
  const { height } = useWindowDimensions();
  const Data = useGroupData(data, height < 500 ? 4 : 6);
  console.log({ socials, data, Data });
  return (
    <BottomSheetContainer title="Follow" parentSwiper={parentSwiper}>
      <CommomSocialsLinks data={Data} />
    </BottomSheetContainer>
  );
};

export default Socials;
