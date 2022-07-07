import { useRef } from 'react';
import clsx from 'clsx';
import Styles from '../Children.module.scss';

import AddTitleButton from '@shared/Buttons/AddTitleButton/AddTitleButton';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import LinkCard from '../SimpleLink/LinkCard';

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
    background: '#b3bac3',
    font: '#b3bac3',
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={initialValues}>
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

              <div
                style={{
                  margin: '1rem 0 0',
                }}
              >
                <LinkCard />
              </div>

              {/* <AddTitleButton title='Add Image' />
              <button
                onClick={(e) => formik.resetForm()}
                className={Styles.clearArea}
              >
                Clear Text Area
              </button> */}

              <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control='input'
                    type='color'
                    name='background'
                    colorInput={true}
                  />
                  <FormikControl
                    control='input'
                    type='color'
                    name='font'
                    colorInput={true}
                  />
                </div>
              </div>

              <button className='sb'>Submit</button>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default TextArea;
