import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromParent,
  setParent,
} from "src/redux/createSlice/createHeightSlice";
import { RootState } from "src/redux/store/store";
import { components } from "../../data";
import Styles from "./MobileForm.module.scss";

const MobileFormButton: React.FC<{
  obj: { title: string; href: string };
  index: number;
}> = ({ obj, index }) => {
  const [height, setHeight] = useState<boolean>(false);

  const handleSetHeight = () => {
    setHeight(!height);
  };

  const pathName = obj.href.split("/").reverse()[0];
  const element = components.find((obj) => obj.title === pathName);

  if (!element?.component) {
    return (
      <div className={Styles.buttonWrapper__button}>
        <button
          onClick={handleSetHeight}
          className={Styles.button}
          // className={` text-white text-base font-medium w-full py-3 px-4  flex items-center justify-between  active:scale-100  `}
        >
          <span>{obj.title}</span>
          <span className="">
            {height ? (
              <img
                src="/assets/icons/down-arrow-light.svg"
                alt="Down Arrow Icon"
                className={Styles.collapseIcon}
              />
            ) : (
              <img
                src="/assets/icons/up-arrow-light.svg"
                alt="Up Arrow Icon"
                className={Styles.collapseIcon}
              />
            )}
          </span>
        </button>

        <div
          style={{
            height: `${height ? "max-content" : "0"}px`,
          }}
          className={Styles.buttonWrapper__elementWrapper}
        >
          <p className="p-[1rem] lg:p-[2rem] text-white">No Component</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={Styles.buttonWrapper__button}
      // className='rounded-2xl  bg-vreel_blue_dark'
    >
      <button
        onClick={handleSetHeight}
        className={Styles.button}
        // className={` text-white text-base font-medium w-full py-3 px-4  flex items-center justify-between  active:scale-100  `}
      >
        <span>{obj.title}</span>
        <span className="">
          {height ? (
            <img
              src="/assets/icons/down-arrow-light.svg"
              alt="Down Arrow Icon"
              className={Styles.collapseIcon}
            />
          ) : (
            <img
              src="/assets/icons/up-arrow-light.svg"
              alt="Up Arrow Icon"
              className={Styles.collapseIcon}
            />
          )}
        </span>
      </button>

      <div
        style={{
          height: `${height ? "auto" : "0px"}`,
        }}
        className={Styles.buttonWrapper__elementWrapper}
      >
        <div className="">{/* <element.component /> */}</div>
      </div>
    </div>
  );
};

export default MobileFormButton;
