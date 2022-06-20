import React, { useState } from "react";
import Styles from "./VLinks.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "src/redux/store/store";
import { getIdActions } from "src/redux/createSlice/bottomSheetSlice";

type Props = {
  item: any;
  index?: number;
  open: boolean;
  setOpen: Function;
  icon?: any;
};

const VLinksCommon = ({ item, index, open, setOpen, icon }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.container__slide__vLinks}>
      <div
        className={clsx(
          Styles.container__slide__vLinks__imgContainer,
          index % 2 === 0 ? Styles.orderFirst : Styles.orderLast
        )}
      >
        <img
          className={clsx(
            index % 2 === 0
              ? Styles.imgBorderRightSide
              : Styles.imgBorderLeftSide
          )}
          src={item.thumbnail}
          alt="vLinks or Events Images"
        />
      </div>
      <div
        className={clsx(
          Styles.container__slide__vLinks__items,
          index % 2 !== 0 ? Styles.orderFirst : Styles.orderLast
        )}
      >
        <div>
          <div className={Styles.container__slide__vLinks__items__h2}>
            <h2>{item.link_header}</h2>
          </div>
          {item.time && item.time.length && (
            <p
              style={{
                fontSize: "20px",
                paddingTop: "8px",
              }}
            >
              {item.time}
            </p>
          )}
          <p>{item.link_sub_header}</p>
        </div>
        {!icon && (
          <div className={Styles.container__slide__vLinks__items__btn}>
            <button
              className={Styles.container__slide__vLinks__items__btn__readMore}
              onClick={() => {
                dispatch(getIdActions(item));
                setOpen(!open);
              }}
            >
              Read More
            </button>
          </div>
        )}
        <div
          className={clsx(
            Styles.container__slide__vLinks__items__btn,
            icon && Styles.infoBtn
          )}
        >
          <button
            style={{
              width: `${icon ? 50 : 100}%`,
              marginLeft: `${icon ? 10 : 0}%`,
            }}
            className={Styles.container__slide__vLinks__items__btn__textElipse}
          >
            {!icon ? "Become a Partner" : item.button}
          </button>
          {icon && (
            <div style={{ width: "40%" }}>
              <img
                src={icon}
                alt="Help Icons"
                style={{ width: "36px", height: "36px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VLinksCommon;
