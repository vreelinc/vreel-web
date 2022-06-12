import React from "react";
import BottomSheetButton from "../Buttons/BottomSheetButton/BottomSheetButton";
import VLinksCommon from "../VLinks/VLinks/VLinksCommon";
import Styles from "./Events.module.scss";
import { EventsData, EventsDataTypes } from "./EventsData";

type Props = {};

const Events = ({ setOpen }) => {
  return (
    <div className={Styles.eventsContainer}>
      {EventsData.map((item: EventsDataTypes, index) => (
        <VLinksCommon item={item} index={index} key={index} />
      ))}
      <BottomSheetButton setOpen={setOpen} title="Connects" />
    </div>
  );
};

export default Events;
