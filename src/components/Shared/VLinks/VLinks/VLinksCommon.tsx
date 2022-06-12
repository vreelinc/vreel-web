import React from "react";
import Styles from "./VLinks.module.scss";
import clsx from "clsx";
import { useAppDispatch } from "src/redux/store/store";
import { expandVLinks, getIdActions } from "src/redux/createSlice/vLinksSlice";
import { VLinksDataTypes } from "./VLinksData";
import { EventsDataTypes } from "../../Events/EventsData";

type Props = {
  item: any;
  index?: number;
};

const VLinksCommon = ({ item, index }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div key={index} className={Styles.vLinksContainer__vLinks}>
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
              dispatch(getIdActions(item.id));
              dispatch(expandVLinks());
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
