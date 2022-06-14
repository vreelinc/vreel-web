import React from "react";
import {
  openConnects,
  openEvents,
} from "src/redux/createSlice/bottomSheetSlice";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import VLinksCommon from "../VLinks/VLinks/VLinksCommon";
import Styles from "./Events.module.scss";
import { EventsData, EventsDataTypes } from "./EventsData";

const Events = () => {
  return (
    <div className={Styles.eventsContainer}>
      <BottomSheetBtnTop title="Events" actions={openEvents} />
      {EventsData.map((item: EventsDataTypes, index) => (
        <VLinksCommon item={item} index={index} key={index} />
      ))}
      <BottomSheetButton actions={openConnects} title="Connects" />
    </div>
  );
};

export default Events;
