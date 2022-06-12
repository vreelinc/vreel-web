import React from "react";
import Styles from "./Socials.module.scss";

type Props = {};

const Socials = (props: Props) => {
  return (
    <div className={Styles.socialsContainer}>
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
    </div>
  );
};

export default Socials;
