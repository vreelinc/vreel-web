import React from 'react';
import clsx from 'clsx';
import { Field, useFormikContext } from 'formik';
import Styles from './RichTextarea.module.scss';

const RichTextarea = (props: any) => {
  const { placeholder, name, elementInput, icon, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <>
            <textarea
              // style={{ backgroundColor: "white" }}
              {...field}
              {...rest}
              placeholder={`${placeholder} `}
              className={Styles.textarea}
            />
            <div className={Styles.moreInfoBtn}>
              {['b', 'i', 'u', 'To Slide', 'Link'].map((item, index) => (
                <button key={index}>
                  <span
                    className={clsx(
                      item === 'b' && Styles.bold,
                      item === 'i' && Styles.italic,
                      item === 'u' && Styles.underline
                    )}
                  >
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </>
        );
      }}
    </Field>
  );
};

export default RichTextarea;
