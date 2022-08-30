import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";
import { ElementsType } from "../ElementsData";
import Styles from "../Elements.module.scss";

import { RootState } from "@redux/store/store";
import {
  removeFromParent,
  setParent,
} from "@redux/createSlice/createHeightSlice";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import { FormikContainer } from "@formik/FormikContainer";

const Element: React.FC<{ element: ElementsType; handleDrag?: any }> = ({
  element,
  handleDrag,
}) => {
  const [height, setHeight] = useState<boolean>(false);
  const handleSetHeight = () => {
    setHeight(!height);
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  if (!element?.component) {
    return (
      <div className={Styles.elementWrapper}>
        <div className={Styles.element}>
          <div className={Styles.buttonWrapper}>
            <span
              {...handleDrag}
              style={{
                cursor: "pointer",
              }}
            >
              <img src="/assets/icons/drag.svg" alt="Drag & Drop Icon" />
            </span>

            <FormikContainer
              initialValues={{
                show: element.active,
              }}
            >
              {(formik) => {
                return (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(formik.values);
                    }}
                  >
                    <ToggleButton
                      name="show"
                      backgroundColor="white"
                      height="30"
                      activeTitle="Hide"
                      activeBackground="#61FF00"
                      activeIcon={<AiIcons.AiOutlineEye />}
                      deactiveTitle="Show"
                      deactiveBackground="#a3a1a1"
                      deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
                    />
                  </form>
                );
              }}
            </FormikContainer>
          </div>

          <span className={Styles.element__title} onClick={handleSetHeight}>
            {element.title.slice(0, 18)}
          </span>
          <button onClick={handleSetHeight}>
            {height ? (
              <img
                src="/assets/icons/up-arrow-light.svg"
                alt="Icon Up arrow"
                className={Styles.collapseIcon}
              />
            ) : (
              <img
                src="/assets/icons/down-arrow-light.svg"
                alt="Icon Down arrow"
                className={Styles.collapseIcon}
              />
              // <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
              // <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
            )}
          </button>
        </div>

        <div
          style={{
            height: `${height ? "auto" : "0px"}`,
          }}
        >
          <div className={Styles.empty_component}>No Component</div>
        </div>
      </div>
    );
  }
  console.log({ element });

  return (
    <div className={Styles.elementWrapper}>
      <div className={Styles.element}>
        <div className={Styles.buttonWrapper}>
          <span
            {...handleDrag}
            style={{
              cursor: "pointer",
            }}
          >
            <img src="/assets/icons/drag.svg" alt="Drag & Drop Icon" />
          </span>
          <FormikContainer
            initialValues={{
              show: element.active,
            }}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formik.values);
                  }}
                >
                  <ToggleButton
                    name="show"
                    backgroundColor="white"
                    height="30"
                    activeTitle="Hide"
                    activeBackground="#61FF00"
                    activeIcon={<AiIcons.AiOutlineEye />}
                    deactiveTitle="Show"
                    deactiveBackground="#a3a1a1"
                    deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
                  />
                </form>
              );
            }}
          </FormikContainer>
        </div>
        {/* <div onClick={() => setShow(!show)}>
          {show ? <BtnShow /> : <BtnHide />}
        </div> */}
        <span className={Styles.element__title} onClick={handleSetHeight}>
          {element.title.slice(0, 18)}
        </span>
        <button onClick={handleSetHeight}>
          {height ? (
            <img
              src="/assets/icons/up-arrow-light.svg"
              alt="Icon Up arrow"
              className={Styles.collapseIcon}
            />
          ) : (
            <img
              src="/assets/icons/down-arrow-light.svg"
              alt="Icon Down arrow"
              className={Styles.collapseIcon}
            />
            // <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
            // <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
          )}
        </button>
      </div>

      <div
        style={{
          height: `${height ? "auto" : "0px"}`,
        }}
      >
        <div>{element.component}</div>
      </div>
    </div>
  );
};

export default Element;
