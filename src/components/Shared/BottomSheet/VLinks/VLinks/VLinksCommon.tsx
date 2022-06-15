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
};

const VLinksCommon = ({ item, index, open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className={Styles.vLinksContainer__slide__vLinks}>
      <div
        className={clsx(
          Styles.vLinksContainer__slide__vLinks__imgContainer,
          index % 2 === 0 ? Styles.orderFirst : Styles.orderLast
        )}
      >
        <img src={item.thumbnail} alt="vLinks or Events Images" />
      </div>
      <div
        className={clsx(
          Styles.vLinksContainer__slide__vLinks__items,
          index % 2 !== 0 ? Styles.orderFirst : Styles.orderLast
        )}
      >
        <div className={Styles.vLinksContainer__slide__vLinks__items__h2}>
          <h2>{item.link_header}</h2>
        </div>
        {item.time && item.time.length && (
          <p
            style={{
              fontSize: "24px",
              paddingTop: "20px",
            }}
          >
            {item.time}
          </p>
        )}
        <p>{item.link_sub_header}</p>
        <div className={Styles.vLinksContainer__slide__vLinks__items__btn}>
          <button
            className={
              Styles.vLinksContainer__slide__vLinks__items__btn__readMore
            }
            onClick={() => {
              dispatch(getIdActions(item));
              setOpen(!open);
            }}
          >
            Read More
          </button>
        </div>
        <div className={Styles.vLinksContainer__slide__vLinks__items__btn}>
          <button>Become a Partner</button>
        </div>
      </div>
    </div>
  );
};

export default VLinksCommon;
