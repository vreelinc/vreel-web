import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetButton";
import VLinksReadModal from "../VLinksReadModal/VLinksReadModal";
import Styles from "./VLinks.module.scss";
import VLinksCommon from "./VLinksCommon";
import { VLinksData } from "./VLinksData";

const VLinks: React.FC<{ setOpen: Function }> = ({ setOpen }) => {
  const { vLinksModalInit } = useSelector((state: RootState) => state.vLinks);
  return (
    <div className={Styles.vLinksContainer}>
      {vLinksModalInit && <VLinksReadModal />}
      {VLinksData.map((item, index) => (
        <VLinksCommon item={item} index={index} key={index} />
      ))}
      <BottomSheetButton setOpen={setOpen} title="Socials" />
    </div>
  );
};

export default VLinks;

/**<div key={index} className={Styles.vLinksContainer__vLinks}>
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
</div>; **/
