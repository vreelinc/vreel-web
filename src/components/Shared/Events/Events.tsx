import React from "react";
import VLinksCommon from "../VLinks/VLinks/VLinksCommon";
import Styles from "./Events.module.scss";
import { EventsData, EventsDataTypes } from "./EventsData";

type Props = {};

const Events = (props: Props) => {
  return (
    <div className={Styles.eventsContainer}>
      {EventsData.map((item: EventsDataTypes, index) => (
        <VLinksCommon item={item} index={index} key={index} />
      ))}
    </div>
  );
};

export default Events;
