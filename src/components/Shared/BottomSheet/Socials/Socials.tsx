import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import {
  openEvents,
  openSocials,
} from "src/redux/createSlice/bottomSheetSlice";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import Styles from "./Socials.module.scss";
const GET_LINKS = gql`
  query User($Username: String) {
    username(username: $Username) {
      username
      vreel {
        author
        elements {
          socials {
            platform
            username
          }
        }
      }
    }
  }
`;
const Socials: React.FC<{ setOpen: Function }> = ({ setOpen }) => {
  const router = useRouter();
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: username,
    },
  });
  console.log({ socials: data?.username.vreel.elements.socials });
  const socials = data?.username.vreel.elements.socials.map((e) => {
    switch (e.platform) {
      case "facebook":
        return {
          icon_link: "/assets/images/instagram.svg",
          bgColor: "#F00073",
          name: "Instagram",
          href: `https://www.facebook.com/${e.uesrname}`,
        };
      case "twitter":
        return {
          icon_link: "/assets/images/twitter.svg",
          bgColor: "#1DA1F2",
          name: "Twitter",
          href: `https://twitter.com/${e.uesrname}`,
        };
      case "youtube":
        return {
          icon_link: "/assets/images/youtube.svg",
          bgColor: "#FF0000",
          name: "Youtube",
          href: `https://www.youtube.com/${e.uesrname}`,
        };
      case "twitch":
        return {
          icon_link: "/assets/images/twitch.svg",
          bgColor: "#9146FF",
          name: "Twitch",
          href: `https://www.instagram.com/${e.uesrname}`,
        };
      case "snapChat":
        return {
          icon_link: "/assets/images/snapChat.svg",
          bgColor: "#FAFF00",
          name: "SnapChat",
          href: `https://www.instagram.com/${e.uesrname}`,
        };
      default:
        return {};
    }
  });
  console.log({ socials });
  if (!data) return <div></div>;
  return (
    <div className={Styles.socialsContainer}>
      <BottomSheetBtnTop title="Socials" actions={openSocials} />
      <div className={Styles.socialsContainer__socials}>
        <h1>Follow Me</h1>
        <div className={Styles.socialsContainer__socials__iconsContainer}>
          {socials
            .filter((e) => e.name)
            .map((item, index) => (
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
      <BottomSheetButton actions={openEvents} title="Events" />
    </div>
  );
};

export default Socials;
