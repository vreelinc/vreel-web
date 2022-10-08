import React, { useState } from "react";
import clsx from "clsx";
import { useCookies } from "react-cookie";
import { gql, useQuery } from "@apollo/client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Styles from "./MediaSelectorGallery.module.scss";

import UploadBtn from "@shared/Buttons/UploadBtn/UploadBtn";
import MediaSelectorGridItem from "../MediaSelectorGrallery/MediaSelectorGridItem";
import { Loader } from "@shared/Loader/Loader";

const SCHEMAS = gql`
  query ($token: String!) {
    getUserByToken(token: $token) {
      files {
        file_count
        files {
          id
          file_name
          file_type
          uri
        }
      }
    }
  }
`;
const MediaSelectorGallery = ({ open, setOpen, setItem }) => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [oepnModal, setOepnModal] = useState(false);

  const userFiles = useQuery(SCHEMAS, {
    variables: {
      token: cookies.userAuthToken,
    },
  });
  const { loading, error, data: data2, refetch } = userFiles || {};

  // if (loading || error || !data2) return <div></div>;


  return (
    <div
      className={clsx(
        Styles.mediaMobileContainer,
        open ? Styles.active : Styles.deActive
      )}
    >
      {loading && <Loader />}
      <div className={Styles.mediaMobileContainer__closer}>
        <button
          className={Styles.mediaMobileContainer__closer__btn}
          onClick={() => setOpen(false)}
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>

      <div className={Styles.mediaMobileContainer__content}>
        <p>Select Slide Media Selector</p>
        <UploadBtn setOpenModal={setOepnModal} />
      </div>

      <div className={Styles.mediaMobileContainer__mediaFileContainer}>
        {data2?.getUserByToken.files.files.map(
          (item: Object, index: number) => (
            <div key={index}>
              <MediaSelectorGridItem
                item={item}
                setItem={setItem}
                setOpen={setOpen}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MediaSelectorGallery;
