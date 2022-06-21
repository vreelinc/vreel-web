import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

import { NavItemTypes } from "../MenuItems";
import Styles from "./MenuItem.module.scss";
import { gmenu, sp } from "src/components/Sections/Sections";
const MenuTitle: React.FC<{
  item: NavItemTypes;
  isRightRound?: boolean;
  action: any;
  isAccount?: boolean;
}> = ({ item, isRightRound, action, isAccount }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isActive = item.href == router.pathname;
  return (
    <div
      onClick={() => {
        if (!isAccount) {
          const no = gmenu.indexOf(item.title);
          console.log({ no, sp });
          if (sp) sp.slideTo(no);
        } else {
          router.push(item.href);
        }

        dispatch(action());
      }}
      className={Styles.menuItemContainer}
    >
      <div
        className={clsx(
          Styles.item,
          router.pathname === item.href ? Styles.active : Styles.deactive
        )}
      >
        {!isRightRound && <span className={Styles.roundBall}></span>}

        <button
          className={clsx(isActive ? Styles.isActive : Styles.isDeactive)}
        >
          {item.title.replaceAll("_", " ")}
        </button>

        {isRightRound && <span className={Styles.roundBall}></span>}
      </div>
    </div>
  );
};

export default MenuTitle;
