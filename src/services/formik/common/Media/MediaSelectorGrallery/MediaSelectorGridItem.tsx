import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useOuterClick } from "../../../../../hooks/useOuterClick";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Styles from "./MediaSelectorGridItem.module.scss";
import clsx from "clsx";

type Props = {
  item: any;
  setItem: Function;
  setOpen: Function;
};

const MediaSelectorGridItem = ({ item, setItem, setOpen }: Props) => {
  const dispatch = useAppDispatch();

  const [pause, setPause] = useState(false);

  const innerRef = useOuterClick(() => {
    setOpen(false);
  });

  return (
    <div className={clsx(Styles.viewImageContainer, Styles.sb)}>
      <div
        onClick={() => {
          setItem(item);
          setOpen(false);
        }}
      >
        <div>
          {item.file_type.split("/")[0] == "image" && (
            <img src={`${item.uri}`} alt="Gallery Images" />
            // <img src={item.uri} alt="" />
          )}
          {item.file_type.split("/")[0] == "video" && (
            <ReactPlayer
              url={`${item.uri}`}
              playing={pause}
              controls={true}
              muted={pause ? false : true}
              width="100%"
              height="100%"
            />
          )}
        </div>
      </div>
      <div className={Styles.playIcons}>
        {item.file_type.split("/")[0] == "video" && (
          <button ref={innerRef} onClick={() => setPause(!pause)}>
            <img src="/assets/icons/play-one.svg" alt="Play Icon" />
          </button>
        )}
        <span>{item.file_type}</span>
      </div>
    </div>
  );
};

export default MediaSelectorGridItem;
