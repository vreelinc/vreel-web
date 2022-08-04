import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Field, useFormikContext } from "formik";
import { AiOutlineEye } from "react-icons/ai";
import { FiPause, FiPlay } from "react-icons/fi";
import Styles from "./Media.module.scss";

import MediaSelectorGallery from "./MediaSelectorGridItem/MediaSelectorGallery";
import clsx from "clsx";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
const EIDT_SCHEMA = gql`
  mutation renameFile($token: String!, $newName: String!, $fileId: String!) {
    editFileName(token: $token, newName: $newName, fileId: $fileId) {
      succeeded
      message
    }
  }
`;
const Media = ({ name = "mobile", uriExt = "uri" }) => {
  const [play, setplay] = useState(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const inputRef = useRef(null);
  const [active, setActive] = useState(false);
  const [renameItem] = useMutation(EIDT_SCHEMA);
  const { setFieldValue, setValues, values } = useFormikContext();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(values[name]);
  function set_item(item: any) {
    if (!item) {
      set_item(null);
      values[name][uriExt] = ``;
      values[name]["content_type"] = ``;
    } else {
      set_item(item);
      values[name][uriExt] = `${item.uri}`;
      values[name]["content_type"] = item.file_type;
    }
  }
  console.log(values[name], name, values[name][uriExt]);

  return (
    <div className={Styles.mediaContainer}>
      {open && (
        <MediaSelectorGallery
          open={open}
          setOpen={setOpen}
          setItem={set_item}
        />
      )}
      <div className={Styles.mediaContainer__leftItem}>
        <Field name={`${name}.${uriExt}`}>
          {({}) => {
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
                    {values[name][uriExt] &&
                    values[name][uriExt] != "/waterfall.mp4" ? (
                      <div
                        onClick={() => setOpen(true)}
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__imgContainer__imgContent
                        }
                      >
                        <img src={values[name][uriExt]} alt="Select Images" />
                      </div>
                    ) : (
                      <div
                        onClick={() => setOpen(true)}
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__imgContainer__logoContent
                        }
                      >
                        <img
                          src={`/assets/icons/${
                            name === "desktop" ? "desktop" : "mobile"
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
                              active ? Styles.inputActive : Styles.inputDeactive
                            )}
                          >
                            <label>Filename</label>
                            <input
                              ref={inputRef}
                              disabled={!active}
                              defaultValue={
                                item?.name ? item?.name : "FileName"
                              }
                              type="text"
                            />
                          </div>
                        </div>
                        <div
                          className={
                            Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__iconContainer
                          }
                        >
                          <button type="button" onClick={() => set_item(null)}>
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
