import React from "react";
import BottomSheetContainer from "../BottomSheetContainer/BottomSheetContainer";
import SwiperSheet from "../SwiperSheet/SwiperSheet";
import { useGroupData } from "../../../../hooks/useGroupData";
import { Data } from "./EventsData";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { SwiperSlide } from "swiper/react";
import Styles from "./Events.module.scss";
import { EventsDataTypes } from "../../Types/BottomSheetDataTypes";
import { HiOutlineInformationCircle } from "react-icons/hi";
import clsx from "clsx";

const Events: React.FC<{ parentSwiper?: any }> = ({ parentSwiper }) => {
  const { height } = useWindowDimensions();
  const data = useGroupData(Data, height < 500 ? 2 : 4);

  return (
    <BottomSheetContainer title="Events" parentSwiper={parentSwiper}>
      <SwiperSheet>
        {data.map((obj, index) => (
          <SwiperSlide key={index}>
            <div className={Styles.events}>
              {obj.map((item: EventsDataTypes, index: number) => (
                <div key={index} className={Styles.events__slide}>
                  <div className={clsx(Styles.events__slide__container)}>
                    <div
                      className={clsx(
                        Styles.events__slide__container__imgContainer,
                        index % 2 === 0
                          ? Styles.events__slide__container__orderFrist
                          : Styles.events__slide__container__orderLast
                      )}
                    >
                      <img src={item.thumbnail} alt="Events Images" />
                    </div>
                    <div
                      className={clsx(
                        Styles.events__slide__container__eventsTextContainer,
                        index % 2 !== 0
                          ? Styles.events__slide__container__orderFrist
                          : Styles.events__slide__container__orderLast
                      )}
                    >
                      <div
                        className={
                          Styles.events__slide__container__eventsTextContainer__eventsTexts
                        }
                      >
                        <h4>{item.link_header}</h4>
                        <h3>{item.time}</h3>
                      </div>
                      <div
                        className={
                          Styles.events__slide__container__eventsTextContainer__btnContainer
                        }
                      >
                        <p>{item.link_sub_header}</p>
                        <div
                          className={
                            Styles.events__slide__container__eventsTextContainer__btnContainer__btn
                          }
                        >
                          <button>{item.btnName}</button>
                          <HiOutlineInformationCircle
                            className={
                              Styles.events__slide__container__eventsTextContainer__btnContainer__btn__icon
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </SwiperSheet>
    </BottomSheetContainer>
  );
};

export default Events;
