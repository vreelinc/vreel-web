import clsx from "clsx";
import React from "react";
import UploadBtn from "src/components/Shared/Buttons/UploadBtn/UploadBtn";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Styles from "./MediaSelectorGallery.module.scss";
import { gql, useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import MediaSelectorGridItem from "../MediaSelectorGrallery/MediaSelectorGridItem";
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
  const userFiles = useQuery(SCHEMAS, {
    variables: {
      token: cookies.userAuthToken,
    },
  });
  const { loading, error, data: data2, refetch } = userFiles || {};

  if (loading || error || !data2) return <div></div>;
  console.log({ data2 });

  return (
    <div
      className={clsx(
        Styles.mediaMobileContainer,
        open ? Styles.active : Styles.deActive,
        Styles.sb
      )}
    >
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
        <UploadBtn />
      </div>

      <div className={Styles.mediaMobileContainer__mediaFileContainer}>
        {data2.getUserByToken.files.files.map((item: Object, index: number) => (
          <div key={index}>
            <MediaSelectorGridItem
              item={item}
              setItem={setItem}
              setOpen={setOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSelectorGallery;
