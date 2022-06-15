import React from "react";
import { NavItem, NavItemTypes } from "../MenuItems";

import { useDispatch, useSelector } from "react-redux";
import MenuItem from "../MenuItem/MenuItem";
import MenuCloseBtn from "../../Buttons/MenuCloseBtn/MenuCloseBtn";
import { useRouter } from "next/router";
import { RootState } from "../../../../redux/store/store";
import clsx from "clsx";
import Styles from "./GeneralMenu.module.scss";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";

const GeneralMenu = () => {
  const { initMenuState } = useSelector((state: RootState) => state.expandMenu);

  return (
    <div
      className={clsx(
        Styles.generalMenu,
        initMenuState ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.container}>
        <MenuCloseBtn action={expandMenu} />
        <div className={Styles.logoContainer}>
          <div className={Styles.logo}>
            <p>Powered By</p>
            <div>
              <img src="/assets/images/vreel-logo.png" />
            </div>
          </div>
        </div>
        <div className={Styles.menuContainer}>
          <div className={Styles.menuContainer__menu}>
            {NavItem.map((item: NavItemTypes, index: number) => (
              <MenuItem
                key={index}
                item={item}
                isRightRound={true}
                action={expandMenu}
              />
            ))}
          </div>
          <div className={Styles.menuContainer__menuLink}>
            <button>Follow</button>
            <button>Add To Contacts</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GeneralMenu;
