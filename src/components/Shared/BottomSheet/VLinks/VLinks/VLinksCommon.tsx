import React from "react";
import Styles from "./VLinks.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "src/redux/store/store";
import {
  getIdActions,
  openEventsModal,
  openVlinksModal,
} from "src/redux/createSlice/bottomSheetSlice";

type Props = {
  item: any;
  index?: number;
};

const VLinksCommon = ({ item, index }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.vLinksContainer__vLinks}>
      <div
        className={clsx(
          Styles.vLinksContainer__vLinks__imgContainer,
          index % 2 === 0 ? Styles.orderFirst : Styles.orderLast
        )}
      >
        <img src={item.image} alt="vLinks Images" />
      </div>
      <div
        className={clsx(
          Styles.vLinksContainer__vLinks__items,
          index % 2 !== 0 ? Styles.orderFirst : Styles.orderLast
        )}
      >
        <h2 className={Styles.h2}>{item.title}</h2>
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
        <p>{item.text}</p>
        <div className={Styles.vLinksContainer__vLinks__items__btn}>
          <button
            className={Styles.vLinksContainer__vLinks__items__btn_readMore}
            onClick={() => {
              dispatch(getIdActions({ id: item.id, type: item.type }));
              {
                item.type.toLowerCase() === "vlinks"
                  ? dispatch(openVlinksModal())
                  : dispatch(openEventsModal());
              }
            }}
          >
            {item.firstButton}
          </button>
        </div>
        <div className={Styles.vLinksContainer__vLinks__items__btn}>
          <button>{item.secondButton}</button>
        </div>
      </div>
    </div>
  );
};

export default VLinksCommon;
