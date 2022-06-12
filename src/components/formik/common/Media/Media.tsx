import React, { useState } from "react";
import Styles from "./Media.module.scss";
import MediaSelectorGallery from "./MediaSelectorGridItem/MediaSelectorGallery";
import { RootState, useAppDispatch } from "src/redux/store/store";
import { useSelector } from "react-redux";
import {
  isDesktopShow,
  removeDesktopMediaPreview,
  removeMediaMobilePreview,
  showAdvancedLogo,
  showMediaMobileSelector,
} from "src/redux/createSlice/createMobileMediaSelector";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import { AiOutlineEye } from "react-icons/ai";
import ReactPlayer from "react-player";
import { Field, useFormikContext } from "formik";

const Media = ({ name = "mobile", uriExt = "uri" }) => {
  const [open, setOpen] = useState(false);
  const [item, setitem] = useState(null);
  console.log({ item });
  const { setFieldValue, setValues, values } = useFormikContext();
  function setItem(item: any) {
    setitem(item);
    const uri = item.uri.replace("localhost", "192.168.0.106");
    values[name][uriExt] = `${uri}${item.id}`;
    values[name]["content_type"] = item.file_type;
    console.log({ item });
  }
  console.log({ values });
  return (
    <div className={Styles.mediaContainer}>
      {open && (
        <MediaSelectorGallery open={open} setOpen={setOpen} setItem={setItem} />
      )}
      <div className={Styles.mediaContainer__leftItem}>
        <Field name={`${name}.${uriExt}`}>
          {({}) => {
            if (!values[name][uriExt])
              return (
                <div
                  className={Styles.mediaContainer__leftItem__mediaImgContainer}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <img
                    src={`/assets/icons/${
                      name === "desktop" ? "desktop" : "mobile"
                    }.svg`}
                    alt={name === "desktop" ? "Desktop Icons" : "Mobile Icons"}
                  />
                  <p>Select {name === "desktop" ? "Desktop" : "Mobile"} File</p>
                </div>
              );
            return (
              <>
                <div
                  className={Styles.mediaContainer__leftItem__mediaContainer}
                >
                  {values[name].content_type.split("/")[0] == "image" && (
                    <img src={values[name][uriExt]} />
                  )}
                  {values[name].content_type.split("/")[0] == "video" && (
                    <ReactPlayer
                      url={values[name][uriExt]}
                      playing={true}
                      controls={true}
                      muted={false}
                      width="100%"
                      height="100%"
                    />
                  )}

                  <div
                    className={
                      Styles.mediaContainer__leftItem__mediaContainer__iconsContainer
                    }
                  >
                    <div
                      className={
                        Styles.mediaContainer__leftItem__mediaContainer__iconsContainer__iconsText
                      }
                    >
                      {values[name].content_type.split("/")[0] == "video" && (
                        <button type="button">
                          <img src="/assets/icons/play-one.svg" />
                        </button>
                      )}
                      <span>Filmwhere</span>
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
                          setOpen(true);
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
