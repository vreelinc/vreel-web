import React from "react";
import { AccMenus, NavItemTypes } from "../MenuItems";
import { useSelector } from "react-redux";
import MenuItem from "../MenuItem/MenuItem";
import MenuCloseBtn from "../../Buttons/MenuCloseBtn/MenuCloseBtn";

import { RootState, useAppDispatch } from "../../../../redux/store/store";
import Styles from "./AccountMenu.module.scss";
import clsx from "clsx";
import {
  expandAccountMenu,
  expandMenu,
} from "src/redux/createSlice/createMenuSlice";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { userAuthReducer } from "src/redux/createSlice/userSlice";
import { useRouter } from "next/router";
const AccountMenu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userAuthToken"]);
  const { initialAccountMenuState } = useSelector(
    (state: RootState) => state.expandMenu
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div
      className={clsx(
        Styles.generalMenu,
        initialAccountMenuState ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.container}>
        <MenuCloseBtn action={expandAccountMenu} />
        <div className={Styles.logoContainer}>
          <div className={Styles.logo}>
            <button
              onClick={() => {
                removeCookie("userAuthToken");
                dispatch(expandAccountMenu());
                dispatch(userAuthReducer(false));
                toast.success("Log Out Successfully");
                router.push("/");
              }}
              className={Styles.logOutBtn}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className={Styles.menuAccContainer}>
          {AccMenus.map((item: NavItemTypes, index: number) => (
            <MenuItem
              key={index}
              item={item}
              isRightRound={false}
              action={expandAccountMenu}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
