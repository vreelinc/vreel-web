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

  const section = link_type?.toLowerCase() === "sections" ? true : false;

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
      {link_type?.toLowerCase() === "slide" ||
      link_type?.toLowerCase() === "sections" ? (
        <select
          defaultValue="Select Slides"
          onChange={(e) => {
            setFieldValue(`${name}.link_url`, e.target.value);
            handleChange;
          }}
        >
          <option value="none">
            Select {!section ? "Slide Number" : "Sections"}
          </option>
          {section
            ? sectionsData.map((item, index) => (
                <option
                  key={index}
                  value={`/${username}?${
                    item.name === "slide" ? item.name : "section"
                  }=${item.id}`}
                >
                  {item.name}
                </option>
              ))
            : slidesContent.map((item, index) => (
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
