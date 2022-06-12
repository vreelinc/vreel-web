import { useRouter } from "next/router";
import { useState } from "react";
import { advanceOptions, footerOptions, regularOptions } from "../../data";
import Styles from "./Dashboard-lg-sidebar.module.scss";

const DesktopSidebar: React.FC = () => {
  const router = useRouter();
  const pathName = router.asPath;
  const pathLength = pathName.split("/");

  pathLength.pop();
  const parentPath = pathLength.join("/");

  return (
    <div className={Styles.desktopSidebar}>
      {/* BRAND LOGO */}
      <div className={Styles.brandLogo} onClick={() => router.push("/")}>
        <img src="/assets/icons/Vreel_logo_small.svg" alt="Brand Logo" />
      </div>

      <ul className="">
        {/* REGULAR ITEMS */}
        {regularOptions.map((obj, index) => {
          return (
            <>
              <li
                onClick={() => {
                  router.push(obj.href);
                }}
                className={`${Styles.navItem} ${
                  (obj.href == parentPath && Styles.navItem__active) ||
                  (obj?.pathname == parentPath && Styles.navItem__active) ||
                  (obj.href == pathName && Styles.navItem__active)
                } `}
                key={index}
              >
                {(obj.href == pathName && (
                  <span className={Styles.navItem__activeSpan}></span>
                )) ||
                  (obj?.pathname == parentPath && (
                    <span className={Styles.navItem__activeSpan}></span>
                  )) ||
                  (obj.href == parentPath && (
                    <span className={Styles.navItem__activeSpan}></span>
                  ))}
                {obj.title}
              </li>

              {/* IF CHILDREN EXIST */}
              {obj.children && (
                <div className={Styles.navChild}>
                  {obj.children.map((obj, index) => (
                    <li
                      onClick={() => {
                        // setCurrentChildIndex(index);
                        router.push(obj.href);
                      }}
                      key={index}
                      className={`${Styles.navChild__treeItem} ${
                        obj.href == pathName
                          ? Styles.navChild__activeItem
                          : Styles.navChild__inactiveItem
                      }`}
                    >
                      {obj.title}
                    </li>
                  ))}
                </div>
              )}
            </>
          );
        })}

        {/* ADVANCED ITEMS */}
        <div className={Styles.advanceEdit}>
          <span className={Styles.advanceEdit_title}>Advanced Edits</span>
          <div className={Styles.advanceEdit__wrapper}>
            {advanceOptions.map((obj, index) => (
              <li
                onClick={() => {
                  router.push(obj.href);
                }}
                key={index}
                className={` ${Styles.advanceEdit__wrapper__treeItem} ${
                  obj.href == pathName
                    ? Styles.advanceEdit__wrapper__activeItem
                    : Styles.advanceEdit__wrapper__inactiveItem
                }`}
              >
                {obj.title}
              </li>
            ))}
          </div>
        </div>

        {/* FOOTER OPTIONS */}
        <div>
          {footerOptions.map((obj, index) => (
            <>
              <li
                onClick={() => {
                  router.push(obj.href);
                }}
                className={`${Styles.footerItem} ${
                  (obj.href == parentPath && Styles.footerItem__active) ||
                  (obj.href == pathName && Styles.footerItem__active)
                }`}
                key={index}
              >
                {(obj.href == pathName && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary"></span>
                )) ||
                  (obj.href == parentPath && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary"></span>
                  ))}
                {obj.title}
              </li>

              {/* IF CHILDREN EXIST */}
              {obj.children && (
                <div className="ml-9 pt-4 overflow-hidden">
                  {obj.children.map((obj, index) => (
                    <li
                      onClick={() => {
                        // setCurrentChildIndex(index);
                        router.push(obj.href);
                      }}
                      key={index}
                      className={`relative text-xl -mt-2  py-3 cursor-pointer dashboard-nested  ${
                        obj.href == pathName
                          ? "text-white before:border-white z-10"
                          : "text-black"
                      }`}
                    >
                      {obj.title}
                    </li>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default DesktopSidebar;
