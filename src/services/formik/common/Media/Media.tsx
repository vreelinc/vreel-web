import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Field, useFormikContext } from "formik";
import {
  AiFillPlayCircle,
  AiFillPlaySquare,
  AiOutlineEye,
} from "react-icons/ai";
import { FiPause, FiPlay } from "react-icons/fi";
import Styles from "./Media.module.scss";

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
const Media = ({ name, media, uriExt = "uri" }) => {
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
  const [displayData, setDisplayData] = useState(media);
  // useEffect(() => {
  //   if(displayData?.content_type.includes('video')) {
  //     if (Hls.isSupported()) {
  //       const hls = new Hls();

  //       hls.loadSource("https://hls-dev.vreel.page/hls/aaron/1661388536144/media.m3u8");
  //       hls.attachMedia(video);
  //       hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //         video.play();
  //       });
  //     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  //       video.src = videoSrc;
  //       video.addEventListener("loadedmetadata", () => {
  //         video.play();
  //       });
  //     }
  //   }
  //   console.log("display data", displayData)
  // }, [displayData])

  if (media) console.log("presenting media ->", media)
  function set_item(item: any) {
    console.log(item)
    setDisplayData({ ...item, content_type: item.file_type })

    if (!item) {
      setItem(null);
      values[name][uriExt] = ``;
      values[name]["content_type"] = ``;
    } else {
      setItem(item);
      values[name][uriExt] = `${item.uri}`;
      values[name]["content_type"] = item.file_type;
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
        <Field name={`${name}.${uriExt}`}>
          {({ }) => {
            return (
              <>
                <div
                  className={Styles.mediaContainer__leftItem__mediaContainer}
                >
                  {/* {values[name].content_type.split("/")[0] == "image" && (
                    <img src={values[name][uriExt]} />
                  )}
                  {values[name].content_type.split("/")[0] == "video" && (
                    <ReactPlayer
                      url={values[name][uriExt]}
                      playing={play}
                      controls={false}
                      muted={true}
                      width="100%"
                      height="100%"
                    />
                  )} */}
                  <div
                    className={
                      Styles.mediaContainer__leftItem__mediaContainer__imgContainer
                    }
                  >
                    {displayData.uri !== "" &&
                      displayData.uri != "/waterfall.mp4" ? (
                      <div
                        onClick={() => setOpen(true)}
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__imgContainer__imgContent
                        }
                      >
                        {displayData["content_type"]?.includes("video") ? (
                          <ReactPlayer muted playing loop url={displayData.uri} />
                        ) : (
                          <img src={displayData.uri || `/assets/icons/desktop.svg`} alt="Select Images" />
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => setOpen(true)}
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__imgContainer__logoContent
                        }
                      >
                        <img
                          src={`/assets/icons/${name === "desktop" ? "desktop" : "mobile"
                            }.svg`}
                          alt={
                            name === "desktop"
                              ? "Desktop Icons"
                              : "Mobile Icons"
                          }
                        />
                        <p>Select {`${name}`} File</p>
                      </div>
                    )}
                    <div style={{ margin: "10px 10px 0 10px" }}>
                      {/* <span>{values[name]["content_type"]}</span> */}
                      {values[name]["content_type"] == "video/mp4" && (
                        <span
                          onClick={() => {
                            if (play) {
                              videoRef.current.pause();
                              // setplay(false);
                            } else {
                              videoRef.current.play();
                              // setplay(true);
                            }
                          }}
                        >
                          {play ? <FiPause /> : <FiPlay />}
                        </span>
                      )}
                    </div>
                  </div>
                  {values[name][uriExt] &&
                    values[name][uriExt] != "/waterfall.mp4" && (
                      <div
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__iconsContainer
                        }
                      >
                        <div
                          className={clsx(
                            Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__title
                          )}
                        >
                          <p>{`${name}`} Selection</p>
                        </div>
                        <div>
                          <div
                            className={clsx(
                              Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__inputContainer,
                              Styles.inputActive
                            )}
                          >
                            {values[name]["content_type"] != "video/mp4" && (
                              <Field name={`${name}.background_audio_uri`}>
                                {({ form, field }) => {
                                  return (
                                    <>
                                      <label>Backgrouhd audio</label>
                                      <input
                                        onChange={(e) => {
                                          form.setFieldValue(
                                            `${name}.background_audio_uri`,
                                            e.target.value
                                          );
                                        }}
                                        // disabled={!active}
                                        defaultValue={
                                          item?.background_audio_uri
                                            ? item?.background_audio_uri
                                            : ""
                                        }
                                        type="text"
                                      />
                                    </>
                                  );
                                }}
                              </Field>
                            )}
                          </div>
                        </div>
                        <div
                          className={
                            Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__iconContainer
                          }
                        >
                          <button
                            type="button"
                            onClick={() => {
                              console.log("clicked....");

                              setAlertActive(true);
                            }}
                          >
                            <img
                              src="/assets/delete-bin-2-line.svg"
                              alt="Icons delete"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpen(true);
                              // setActive(!active);
                              return;
                              console.log(inputRef?.current?.value);

                              if (active) {
                                renameItem({
                                  variables: {
                                    token: cookies["userAuthToken"],
                                    newName: inputRef?.current?.value,
                                    fileId: item.id,
                                  },
                                })
                                  .then((res) => {
                                    if (res?.data?.editFileName.succeeded) {
                                      toast.success(`File Rename Successfully`);
                                    }
                                  })
                                  .catch((error) => {
                                    toast.error(error.message);
                                  });
                                setActive(false);
                              }
                            }}
                          >
                            <img
                              src="/assets/ball-pen-line.svg"
                              alt="Icons rename"
                            />
                          </button>
                          <button type="button">
                            <a
                              href={values[name][uriExt]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiOutlineEye className={Styles.viewIcon} />
                            </a>
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              </>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default React.memo(Media);

{
  /* <CommonFile
            type={getMediaMobileLink.file_type}
            isdesktop={false}
            name="mobile"
            remove={removeMediaMobilePreview}
          >
            
          </CommonFile> */
}
