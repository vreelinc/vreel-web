import { useRef } from 'react';
import clsx from 'clsx';
import Styles from '../Children.module.scss';

import AddTitleButton from '@shared/Buttons/AddTitleButton/AddTitleButton';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';

const TextArea: React.FC = () => {
  const options = [
    { title: 'b' },
    { title: 'i' },
    { title: 'u' },
    { title: 'To Slide' },
    { title: 'Link' },
  ];

  const initialValues = {
    header: '',
    info: '',
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={Styles.children}>
      <FormikContainer>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <FormikControl
                control='input'
                type='text'
                name='header'
                placeholder='Header'
                required={true}
                elementInput={true}
                icon={true}
              />
              <FormikControl
                control='textarea'
                type='text'
                name='info'
                placeholder='Info'
                required={true}
                elementInput={true}
                icon={true}
              />

              <div className={Styles.optionWrapper}>
                {options.map((option, index) => (
                  <button key={index} className={Styles.option}>
                    <span
                      className={clsx(
                        option.title === 'b'
                          ? Styles.option_bold
                          : option.title === 'i'
                          ? Styles.option_italic
                          : option.title === 'u'
                          ? Styles.option_underline
                          : ''
                      )}
                    >
                      {option.title}
                    </span>
                  </button>
                ))}
              </div>

              <AddTitleButton title='Add Image' />
              <button
                onClick={(e) => formik.resetForm()}
                className={Styles.clearArea}
              >
                Clear Text Area
              </button>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default TextArea;
