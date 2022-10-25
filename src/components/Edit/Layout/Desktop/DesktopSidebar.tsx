import { createPage, setCurrentPageId } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { advanceOptions, footerOptions, regularOptions } from "../../data";
import Styles from "./Dashboard-lg-sidebar.module.scss";

interface Props {
  pages: [];
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL;

const DesktopSidebar: React.FC<Props> = () => {
  const { username, id } = useSelector(
    (state: RootState) => state.userAuth.user
  );
  const { pages, currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  const [cookies] = useCookies(["userAuthToken"]);
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const pathName = router.asPath;
  const pathLength = pathName.split("/");
  const [isDefaultPage, setIsDefaultPage] = useState(true);
  pathLength.pop();
  const parentPath = pathLength.join("/");

  useEffect(() => {
    setIsDefaultPage(currentPageId === id);
  }, [currentPageId]);

  return (
    <div className={Styles.desktopSidebar}>
      {/* BRAND LOGO */}
      <div
        className={Styles.brandLogo}
        onClick={() => router.push(`/${username}/p/${currentPageId}`)}
      >
        <img src="/assets/icons/Vreel_logo_small.svg" alt="Brand Logo" />
      </div>

      <div style={{ padding: "2pc" }}>
        <label style={{ color: "white" }}>Pages</label>
        <div style={{ margin: "20px" }}>
          {pages.map((page) => (
            <div
              style={{ marginTop: "10px", cursor: "grab" }}
              onClick={() => dispatch(setCurrentPageId(page.id))}
            >
              <label
                style={{
                  color: "white",
                  fontWeight: currentPageId === page.id ? "bold" : "lighter",
                  fontSize: "13px",
                }}
              >
                {page.id === id ? "default" : page.id}
              </label>
              <button
                onClick={() =>
                  window.open(
                    page.id !== id
                      ? `${baseUrl}/${username}/p/${page.id}`
                      : `${baseUrl}/${username}`
                  )
                }
              >
                visit
              </button>
            </div>
          ))}
        </div>
        <div>
          <FActionsBtn
            title={`Create Page`}
            padding="7px 13px"
            bgColor="#11b03e"
            color="white"
            actions={() => dispatch(createPage(cookies.userAuthToken))}
          />
        </div>
        <div>
          <FActionsBtn
            title={`Visit Analytics`}
            padding="7px 13px"
            bgColor="#11b03e"
            color="white"
            actions={() => {
              console.log(
                `/analytics?username=${username}&${
                  isDefaultPage ? "" : `pageId=${currentPageId}`
                }`
              );
              router.push(
                `/analytics?username=${username}&${
                  isDefaultPage ? "" : `pageId=${currentPageId}`
                }`
              );
            }}
          />
        </div>
      </div>

      <ul className="">
        {/* REGULAR ITEMS */}
        {regularOptions.map((obj, index) => {
          if (obj.title === "View Vreel") {
            obj.href = `/${username}`;
          }
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
          {/* <span className={Styles.advanceEdit_title}>Advanced Edits</span> */}
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
