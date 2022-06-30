import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { title } from "process";
import { BsPlusCircle, BsX } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getCounter, RENDER_COUNTER } from "../globalCounter";
import * as AiIcons from "react-icons/ai";
import {
  addCollupse,
  removeCollupse,
} from "src/redux/createSlice/createCollapseSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";

import Styles from "./Collapse.module.scss";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";

function getChildHeight(
  level: number,
  collupse: any,
  id: string,
  height: number
) {
  const { level1, level2, level3 } = collupse;
  if (level == 3) console.log(collupse);

  if (level == 3 || height == 0) return 0;
  else if (level == 2) {
    return level2
      .filter((e) => e.level_2 == id)
      .map((e) => e.height)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  } else if (level == 1) {
    return (
      level1
        .filter((e) => e.level_1 == id)
        .map((e) => e.height)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
      level2
        .filter((e) => e.level_1 == id)
        .map((e) => e.height)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );
  }
}
const Collapse = ({
  title,
  level,
  children,
  level_1 = "",
  level_2 = "",
}: any) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const { collupse } = useSelector((state: RootState) => state.collapse);
  const [height, setheight] = useState(0);
  const id =
    level == 1
      ? title
      : level == 2
      ? `${level_1}_${title}`
      : `${level_1}_${level_2}_${title}`;

  const handleHeight = useCallback(() => {
    setheight(height == 0 ? ref.current.scrollHeight : 0);
    dispatch(
      height == 0
        ? addCollupse({
            id,
            level,
            height: ref.current.scrollHeight,
            level_1,
            level_2,
          })
        : removeCollupse({
            id,
            level,
          })
    );
  }, [height]);

  console.log(`render:${getCounter()} id: ${id}`);

  return (
    <div
      className={clsx(
        level == 1 ? Styles.slideContainer : Styles.innerSlideContainer,
        Styles.deActiveHeight
      )}
    >
      <div className={Styles.collapse} onClick={handleHeight}>
        <div className={Styles.collapse__button}>
          <span>{title}</span>
          {/* <ToggleButton
          name="show"
          backgroundColor="white"
          height="30"
          activeTitle="Hide"
          activeBackground="#61FF00"
          activeIcon={<AiIcons.AiOutlineEye />}
          deactiveTitle="Show"
          deactiveBackground="#a3a1a1"
          deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
        /> */}

          <span>
            {!height ? (
              <img
                src="/assets/icons/down-arrow-light.svg"
                alt="Down Arrow Icon"
              />
            ) : (
              <img
                src="/assets/icons/up-arrow-light.svg"
                alt="Up Arrow Icon"
                className={Styles.collapseIcon}
              />
            )}
          </span>
        </div>

        <div className={Styles.collapse__text}>
          <span></span>
          <span>Think Circular</span>
          <button>
            <img src="/assets/icons/dots.svg" alt="Dots" />
          </button>
        </div>
      </div>
      <div
        style={{
          height: `${height + getChildHeight(level, collupse, id, height)}px`,
        }}
        className={Styles.slide}
      >
        <div className={Styles.slideBody} ref={ref}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Collapse);
