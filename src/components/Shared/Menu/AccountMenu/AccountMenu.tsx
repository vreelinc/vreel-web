import React from "react";
import { AccMenus, NavItemTypes } from "../MenuItems";
import { useSelector } from "react-redux";
import MenuItem from "../MenuItem/MenuItem";
import MenuCloseBtn from "../../Buttons/MenuCloseBtn/MenuCloseBtn";

import Styles from "./AccountMenu.module.scss";
import clsx from "clsx";
import { expandAccountMenu } from "src/redux/createSlice/createMenuSlice";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { userAuthReducer } from "src/redux/createSlice/userSlice";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@redux/store/store";
const AccountMenu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userAuthToken"]);
  const { expandMenu, userAuth } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = userAuth?.user;

  return (
    <div
      className={clsx(
        Styles.generalMenu,
        expandMenu.initialAccountMenuState ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.container}>
        <MenuCloseBtn action={expandAccountMenu} />
        <div className={Styles.logoContainer}>
          <div className={Styles.logo}>
            <button
              onClick={() => {
                window.open('/', "_self")
                removeCookie("userAuthToken");
                dispatch(expandAccountMenu());
                dispatch(userAuthReducer(false));
                toast.success("Log Out Successfully");
              }}
              className={Styles.logOutBtn}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className={Styles.menuAccContainer}>
          {AccMenus.map((item: NavItemTypes, index: number) => {
            return (
              <MenuItem
                isAccount={true}
                key={index}
                item={{
                  ...item,
                  href: item?.id === 1 ? `/${user?.username}` : item?.href,
                }}
                isRightRound={false}
                action={expandAccountMenu}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
