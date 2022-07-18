import { useSlideRefer } from "@hooks/useSlideRefer";
import clsx from "clsx";
import { useFormikContext } from "formik";
import React, { useCallback, useState } from "react";
import FormikControl from "src/services/formik/FormikControl";
import { callToActionsData, SlidesDataType } from "../../../SlidesData";
import Styles from "./CallToActions.module.scss";

const CallToActions = ({ name, link_type }) => {
  const [type, settype] = useState(callToActionsData[0].title);
  const { setFieldValue, handleChange } = useFormikContext();

  const handleActive = useCallback(
    (index: number, title) => {
      settype(title);
      setFieldValue(`${name}.link_type`, title);
    },
    [link_type]
  );
  const { getSlidesData } = useSlideRefer();
  const { sectionsData, username, slidesContent } = getSlidesData();

  return (
    <div className={Styles.callToActionsContainer}>
      <FormikControl
        name={`${name}.link_header`}
        control="input"
        placeholder="Link Header"
        type="text"
        slideinput={true}
      />
      <div className={Styles.callToActionsContainer__btnGrid}>
        {callToActionsData.map((item: SlidesDataType, index: number) => (
          <div
            key={index}
            className={clsx(
              link_type === item.title ? Styles.active : Styles.deactive
            )}
            onClick={() => handleActive(index, item.title)}
          >
            <img src={item.src} alt="Call element Icon" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      {/* ----------------------------- Select Tag -----------------------*/}
      {link_type?.toLowerCase() === "slide" ||
      link_type?.toLowerCase() === "event" ||
      link_type?.toLowerCase() === "group" ||
      link_type?.toLowerCase() === "sections" ? (
        <select
          onChange={(e) => {
            setFieldValue(`${name}.link_url`, e.target.value);
            handleChange;
            console.log(e.target.value);
          }}
        >
          <option value="none">Select {link_type}</option>

          {/* ----------------------------- Sections Elemsnts Option-----------------------*/}
          {link_type?.toLowerCase() === "sections" &&
            sectionsData.map((item, index) => (
              <option
                key={index}
                value={`/${username}?${
                  item.name === "slide" ? item.name : "section"
                }=${item.id}`}
              >
                {item.name}
              </option>
            ))}

          {/* ----------------------------- Slides Elemsnts Option-----------------------*/}
          {link_type?.toLowerCase() === "slide" &&
            slidesContent.map((item, index) => (
              <option key={index} value={`/${username}?slide=${item.id}`}>
                {item.title.header}
              </option>
            ))}

          {/* ----------------------------- Events Elemsnts Option-----------------------*/}
          {link_type?.toLowerCase() === "event" &&
            slidesContent.map((item, index) => (
              <option key={index} value={`/${username}?slide=${item.id}`}>
                {item.title.header}
              </option>
            ))}

          {/* ----------------------------- Group Elemsnts Option-----------------------*/}
          {link_type?.toLowerCase() === "group" &&
            slidesContent.map((item, index) => (
              <option key={index} value={`/${username}?slide=${item.id}`}>
                {item.title.header}
              </option>
            ))}
        </select>
      ) : (
        <FormikControl
          name={`${name}.link_url`}
          control="input"
          placeholder={type}
          onChange={handleChange}
          type={
            type.toLowerCase() === "email" || type.toLowerCase() === "url"
              ? type.toLowerCase()
              : "text"
          }
          slideinput={true}
        />
      )}
    </div>
  );
};

export default CallToActions;
