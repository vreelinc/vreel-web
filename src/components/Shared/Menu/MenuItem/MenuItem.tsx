import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

import { NavItemTypes } from "../MenuItems";
import Styles from "./MenuItem.module.scss";

const MenuTitle: React.FC<{
  item: NavItemTypes;
  isRightRound?: boolean;
  action: any;
}> = ({ item, isRightRound, action }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isActive = item.href == router.pathname;
  return (
    <div
      onClick={() => {
        router.push(item.href);
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
          {item.title}
        </button>

        {isRightRound && <span className={Styles.roundBall}></span>}
      </div>
    </div>
  );
};

export default MenuTitle;
