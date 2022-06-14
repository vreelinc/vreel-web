import clsx from "clsx";
import React from "react";
import Styles from "./VLinksReadModal.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/redux/store/store";
import {
  openEventsModal,
  openVlinksModal,
} from "src/redux/createSlice/bottomSheetSlice";
import { VLinksData } from "../VLinks/VLinksData";
import { EventsData } from "../../Events/EventsData";
import { boolean } from "yup";

type Props = {};

const VLinksReadModal: React.FC<{
  open?: boolean;
  setOpen?: Function;
  item?: any;
}> = ({ open, setOpen, item }) => {
  return (
    <div
      className={clsx(
        Styles.vLinksModal,
        open ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.vLinksModal__container}>
        <div
          className={Styles.vLinksModal__container__crosIcons}
          onClick={() => {
            setOpen(false);
          }}
        >
          <IoIosCloseCircleOutline />
        </div>
        <div className={Styles.vLinksModal__container__topPart}>
          <div className={Styles.vLinksContainer__vLinks}>
            <div className={clsx(Styles.vLinksContainer__vLinks__imgContainer)}>
              <img src={item.thumbnail} alt="vLinks Images" />
            </div>
            <div className={clsx(Styles.vLinksContainer__vLinks__items)}>
              <h2 className={Styles.h2}>{item.link_header}</h2>
              <p>{item.link_sub_header}</p>
              <div className={Styles.vLinksContainer__vLinks__items__btn}>
                <button
                  className={
                    Styles.vLinksContainer__vLinks__items__btn_readMore
                  }
                >
                  Read Less
                </button>
              </div>
              <div className={Styles.vLinksContainer__vLinks__items__btn}>
                <button>CTA</button>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.paragraph}>
          <p>
            Currently, in the U.S. and Canada, ring carriers can be recycled
            where #4 LDPE mixed plastics, including ring carriers, are
            collected. However, we recognize more needs to be done to support
            collection services and recycling infrastructure. Where ring
            carriers are not collected today, Hi-Cone has created a free
            recycling program to ensure that consumers can recycle their ring
            carriers and give them a second life.
          </p>
        </div>

        <div className={Styles.vLinksModal__container__logoContainer}>
          <p>Sponsored By</p>
          <div className={Styles.vLinksModal__container__logoContainer__logo}>
            <img src="/assets/images/vreel-logo.png" alt="Vreel Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VLinksReadModal;
