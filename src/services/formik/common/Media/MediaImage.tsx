import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Field, useFormikContext } from "formik";
import {
  AiFillPlayCircle,
  AiFillPlaySquare,
  AiOutlineEye,
} from "react-icons/ai";
import { FiPause, FiPlay } from "react-icons/fi";
import Styles from "./MediaImage.module.scss";

import MediaSelectorGallery from "./MediaSelectorGridItem/MediaSelectorGallery";
import clsx from "clsx";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import Alert from "@shared/Alert/Alert";
const EIDT_SCHEMA = gql`
  mutation renameFile($token: String!, $newName: String!, $fileId: String!) {
    editFileName(token: $token, newName: $newName, fileId: $fileId) {
      succeeded
      message
    }
  }
`;
const MediaImage = ({ name, image }: any) => {
  const [play, setplay] = useState(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);
  const [renameItem] = useMutation(EIDT_SCHEMA);
  const { setFieldValue, setValues, values } = useFormikContext();
  const [open, setOpen] = useState(false);
  const [isAlertActive, setAlertActive] = useState<boolean>(false);
  const [item, setItem] = useState(values[name]);
  const [displayUri, setDisplayUri] = useState(image);

  useEffect(() => {
    console.log(image)
  }, [image])
  function set_item(item: any) {
    setDisplayUri(item.uri)

    if (!item) {
      setItem(null);
      setFieldValue(name, "");
    } else {
      setItem(item);
      setFieldValue(name, item.uri);
    }
  }

  return (
    <div className={Styles.mediaContainer}>
      <Alert
        text={`Are you sure you want to remove the media for ${name}?`}
        noCallback={() => {
          setAlertActive(false);
        }}
        yesCallback={() => {
          setAlertActive(false);
          set_item(null);
        }}
        open={isAlertActive}
      />
      {open && (
        <MediaSelectorGallery
          open={open}
          setOpen={setOpen}
          setItem={set_item}
        />
      )}
      <div className={Styles.mediaContainer__leftItem}>
        <Field name={name}>
          {({ }) => {
            return (
              <div style={{ width: "100%" }}>
                <div>
                  <div
                    onClick={() => setOpen(true)}
                    style={{
                      width: "100%",
                      height: "100px",
                    }}
                    className={
                      Styles.mediaContainer__leftItem__mediaContainer__imgContainer__logoContent
                    }
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "10px",
                      }}
                      // src="https://soft-commerce.vercel.app/assets/images/cosmetics/Amouage%20Perfume%20Eau%20de%20toilette%20Note%20Eau%20de%20Cologne.png"
                      src={displayUri || `/assets/icons/desktop.svg`}
                      alt={
                        name === "desktop" ? "Desktop Icons" : "Mobile Icons"
                      }
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default React.memo(MediaImage);

{
  /* <CommonFile
            type={getMediaMobileLink.file_type}
            isdesktop={false}
            name="mobile"
            remove={removeMediaMobilePreview}
          >
            
          </CommonFile> */
}
