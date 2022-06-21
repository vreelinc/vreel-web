import clsx from "clsx";
import { useFormikContext } from "formik";
import React, { useCallback, useState } from "react";
import FormikControl from "src/components/formik/FormikControl";
import { callToActionsData, SlidesDataType } from "../../../SlidesData";
import Styles from "./CallToActions.module.scss";

const CallToActions = ({ name }) => {
  const [active, setActive] = useState(0);
  const [type, settype] = useState(callToActionsData[0].title);
  const { setFieldValue } = useFormikContext();

  const handleActive = useCallback(
    (index: number, title) => {
      settype(title);
      setFieldValue(`${name}.link_type`, title);
      setActive(index);
    },
    [active]
  );
  return (
    <div className={Styles.callToActionsContainer}>
      <FormikControl
        name={`${name}.link_header`}
        control="input"
        placeholder="Link Header"
        type="text"
        slideinput={true}
      />
      <p>Link Type</p>
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
      <p>Link</p>
      {active === 4 || active === 5 ? (
        <select>
          <option value={1}>1</option>
        </select>
      ) : (
        <FormikControl
          name={`${name}.link_url`}
          control="input"
          placeholder={type}
          type="text"
          slideinput={true}
        />
      )}
    </div>
  );
};

export default CallToActions;
