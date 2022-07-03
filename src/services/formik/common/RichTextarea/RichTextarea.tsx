import React from "react";
import clsx from "clsx";
import { Field, useFormikContext } from "formik";
import Styles from "./RichTextarea.module.scss";

const RichTextarea = (props: any) => {
  const { placeholder, name, elementInput, icon, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <>
            <textarea
              // style={{ backgroundColor: "white" }}
              rows={4}
              {...field}
              {...rest}
              placeholder={`${placeholder} `}
              className={Styles.textarea}
            />
            <div className={Styles.moreInfoBtn}>
              <button type="button" className={Styles.moreInfoBtn__infoBtn}>
                <span className={Styles.bold}>b</span>
              </button>
              <button type="button" className={Styles.moreInfoBtn__infoBtn}>
                <span className={Styles.italic}>i</span>
              </button>
              <button type="button" className={Styles.moreInfoBtn__infoBtn}>
                <span className={Styles.underline}>u</span>
              </button>
              <button type="button" className={Styles.moreInfoBtn__infoBtn}>
                To Slide
              </button>
              <button type="button" className={Styles.moreInfoBtn__infoBtn}>
                Link
              </button>
            </div>
          </>
        );
      }}
    </Field>
  );
};

export default RichTextarea;
