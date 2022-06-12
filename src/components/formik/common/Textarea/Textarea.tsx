import { Field, useFormikContext } from 'formik';
import React from 'react';
import ElementInput from '../ElementInput/ElementInput';
import Styles from './Textarea.module.scss';

const Textarea = (props: any) => {
  const { placeholder, name, elementInput, icon, ...rest } = props;
  const { errors, setFieldValue } = useFormikContext();
  return (
    <div className={''}>
      <Field name={name}>
        {({ field, form }) => {
          if (elementInput) {
            return (
              <ElementInput
                type='textarea'
                placeholder={placeholder}
                field={field}
                rest={rest}
                icon={icon}
              />
            );
          }

          return (
            <div>
              <textarea
                // style={{ backgroundColor: "white" }}
                {...field}
                {...rest}
                placeholder={`${placeholder} `}
                className={Styles.textarea}
              />
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Textarea;
