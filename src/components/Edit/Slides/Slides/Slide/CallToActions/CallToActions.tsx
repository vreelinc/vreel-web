import { useSlideRefer } from "@hooks/useSlideRefer";
import clsx from "clsx";
import { useFormikContext } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import FormikControl from "src/services/formik/FormikControl";
import { callToActionsData, SlidesDataType } from "../../../SlidesData";
import Styles from "./CallToActions.module.scss";

const CallToActions = ({ name }) => {
  const [active, setActive] = useState(0);
  const [type, settype] = useState(callToActionsData[0].title);
  const { setFieldValue } = useFormikContext();
  const router = useRouter();

  const handleActive = useCallback(
    (index: number, title) => {
      settype(title);
      setFieldValue(`${name}.link_type`, title);
      setActive(index);
    },
    [active]
  );
  const { getSlidesData } = useSlideRefer();
  const { menu, username, slidesContent } = getSlidesData();

  const slide = active === 4 ? true : false;

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
            className={clsx(active === index ? Styles.active : Styles.deactive)}
            onClick={() => handleActive(index, item.title)}
          >
            <img src={item.src} alt="Call element Icon" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      {active === 4 || active === 5 ? (
        <select
          defaultValue="Select Slides"
          onChange={(e) => {
            router.push(e.target.value);
          }}
        >
          <option value="none">
            Select {!slide ? "Slide Number" : "Sections"}
          </option>
          {slide
            ? menu.map((item, index) => (
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
                  {index}
                </option>
              ))}
        </select>
      ) : (
        <FormikControl
          name={`${name}.link_url`}
          control="input"
          placeholder={type}
          type={
            type.toLowerCase() === "email" || type.toLowerCase() === "url"
              ? type.toLowerCase()
              : "text"
          }
          slideinput={true}
          required
        />
      )}
    </div>
  );
};

export default CallToActions;
