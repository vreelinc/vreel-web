import React from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import clsx from 'clsx';
import Styles from './Input.module.scss';

import TextError from '../TextError/TextError';
import ElementInput from '../ElementInput/ElementInput';
import SocialInput from '../SocialInput/SocialInput';

const Input = (props: any) => {
  const { slideinput, elementInput, social, icon, placeholder, name, ...rest } =
    props;
  const { errors, setFieldValue } = useFormikContext();

  return (
    <div className={Styles.formControl}>
      <Field name={name}>
        {({ field, form }) => {
          if (elementInput) {
            return (
              <ElementInput
                type='text'
                placeholder={placeholder}
                field={field}
                rest={rest}
                icon={icon}
              />
            );
          }

          if (social) {
            return (
              <SocialInput
                logo={social.logo}
                title={social.title}
                placeholder={placeholder}
                field={field}
                rest={rest}
              />
            );
          }

          return (
            <div>
              <input
                // style={{ backgroundColor: "white" }}
                {...field}
                {...rest}
                placeholder={`${placeholder} `}
                className={clsx(slideinput ? Styles.slideinput : Styles.input)}
              />
            </div>
          );
        }}
      </Field>

      <div className={Styles.error}>
        {errors[name] && <ErrorMessage component={TextError} name={name} />}
      </div>
    </div>
  );
};

export default Input;
