import clsx from "clsx";
import React from "react";
import Styles from "./VLinksReadModal.module.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/redux/store/store";
import { expandVLinks } from "src/redux/createSlice/vLinksSlice";
import { VLinksData } from "../VLinks/VLinksData";

type Props = {};

const VLinksReadModal = (props: Props) => {
  const { vLinksModalInit, id } = useSelector(
    (state: RootState) => state.vLinks
  );
  const dispatch = useAppDispatch();

  const data = VLinksData.find((item) => item.id === id);

  return (
    <div
      className={clsx(
        Styles.vLinksModal,
        vLinksModalInit ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.vLinksModal__container}>
        <div
          className={Styles.vLinksModal__container__crosIcons}
          onClick={() => dispatch(expandVLinks())}
        >
          <IoIosCloseCircleOutline />
        </div>
        <div className={Styles.vLinksModal__container__topPart}>
          <div className={Styles.vLinksContainer__vLinks}>
            <div className={clsx(Styles.vLinksContainer__vLinks__imgContainer)}>
              <img src={data?.image} alt="vLinks Images" />
            </div>
            <div className={clsx(Styles.vLinksContainer__vLinks__items)}>
              <h2 className={Styles.h2}>{data?.title}</h2>
              <p>{data?.text}</p>
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
