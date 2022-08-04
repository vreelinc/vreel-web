import clsx from "clsx";
import { Field, useFormikContext } from "formik";
import React, { useCallback, useState } from "react";
import Styles from "./Switch.module.scss";

const Switch = ({
  bgActive = "green",
  bgDeActive = "#a3a1a1",
  height = 25,
  width = 90,
  firstInnerText = "Off",
  secondInnertext = "On",
  firstTitle = "On",
  secondTitle = "Off",
  name,
}) => {
  const { setFieldValue, getFieldMeta, values } = useFormikContext();
  const [active, setActive] = useState(getFieldMeta(name).value);
  console.log({
    advanced: values["advanced"],
    field: getFieldMeta(name).value,
  });

  return (
    <div
      className={Styles.toggleBtn}
      style={{
        backgroundColor: `${active ? bgActive : bgDeActive}`,
        boxShadow: `inset 5px 5px 5px 6px ${active ? bgActive : bgDeActive}`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={() => {
        setFieldValue(name, !active);
        setActive(!active);
      }}
    >
      {firstInnerText && (
        <span
          className={clsx(
            Styles.toggleBtn__switchText,
            active ? Styles.active : Styles.deactive
          )}
          style={{ width: `${width / 3}px`, color: "white" }}
        >
          {active ? firstInnerText : secondInnertext}
        </span>
      )}
      <button className={clsx(active ? Styles.on : Styles.off)} type="button">
        {active ? firstTitle : secondTitle}
      </button>
    </div>
  );
};

export default React.memo(Switch);
