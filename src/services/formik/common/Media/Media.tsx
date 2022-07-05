import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Field, useFormikContext } from "formik";
import { AiOutlineEye } from "react-icons/ai";
import { FiPause, FiPlay } from "react-icons/fi";
import Styles from "./Media.module.scss";

import MediaSelectorGallery from "./MediaSelectorGridItem/MediaSelectorGallery";
import clsx from "clsx";

const Media = ({ name = "mobile", uriExt = "uri" }) => {
  const [open, setOpen] = useState(false);
  const [play, setplay] = useState(false);
  const [active, setActive] = useState(false);
  const { setFieldValue, setValues, values } = useFormikContext();
  const [item, setitem] = useState(values[name]);
  function setItem(item: any) {
    if (!item) {
      setitem(null);
      values[name][uriExt] = ``;
      values[name]["content_type"] = ``;
    } else {
      setitem(item);
      values[name][uriExt] = `${item.uri}`;
      values[name]["content_type"] = item.file_type.split("/")[0];
    }
  }

  return (
    <div className={Styles.mediaContainer}>
      {open && (
        <MediaSelectorGallery open={open} setOpen={setOpen} setItem={setItem} />
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
                    {!values[name][uriExt] ? (
                      <div
                        className={
                          Styles.mediaContainer__leftItem__mediaContainer__imgContainer__imgContent
                        }
                      >
                        <img
                          src="/assets/images/Events1.svg"
                          alt="Select Images"
                        />
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
                          disabled={true}
                          defaultValue={item.name ? item.name : "FileName"}
                          type="text"
                        />
                      </div>
                    </div>
                    <div
                      className={
                        Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__iconContainer
                      }
                    >
                      <button type="button" onClick={() => setItem(null)}>
                        <img
                          src="/assets/delete-bin-2-line.svg"
                          alt="Icons delete"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActive(true);
                        }}
                      >
                        <img
                          src="/assets/ball-pen-line.svg"
                          alt="Icons rename"
                        />
                      </button>
                      <button type="button">
                        <AiOutlineEye className={Styles.viewIcon} />
                      </button>
                    </div>
                  </div>
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
