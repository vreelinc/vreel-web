import React, { useState } from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import {
  openContribute,
  openEvents,
  openSocials,
} from "src/redux/createSlice/bottomSheetSlice";
import { SwiperSlide } from "swiper/react";
import BottomSheetButton from "../../Buttons/BottomSheetButton/BottomSheetBtnBottom/BottomSheetBtnBottom";
import BottomSheetBtnTop from "../../Buttons/BottomSheetButton/BottomSheetBtnTop/BottomSheetBtnTop";
import { EventsDataTypes } from "../../Types/BottomSheetDataTypes";
import SwiperSheet from "../SwiperSheet/SwiperSheet";
import VLinksCommon from "../VLinks/VLinks/VLinksCommon";
import Styles from "./Events.module.scss";
import { EventsData } from "./EventsData";

const Events = () => {
  const { height } = useWindowDimensions();
  const Data = useGroupData(EventsData, height < 500 ? 2 : 3);
  const [open, setOpen] = useState(false);

  return (
    <div className={Styles.eventsContainer}>
      <BottomSheetBtnTop title="Events" actions={openEvents} />
      <SwiperSheet>
        {Data.map((obj: any, index: number) => (
          <SwiperSlide key={index} className={Styles.eventsContainer__slide}>
            {obj.map((item: any, index: number) => (
              <VLinksCommon
                item={item}
                index={index}
                key={index}
                open={open}
                setOpen={setOpen}
                icon="/assets/icons/icon-info.svg"
              />
            ))}
          </SwiperSlide>
        ))}
      </SwiperSheet>
      <BottomSheetButton openActions={openSocials} closeActions={openEvents} />
    </div>
  );
};

export default Events;
