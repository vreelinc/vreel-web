import React from 'react';
import Styles from '../Children.module.scss';

import LinkCard from './LinkCard';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import AddTitleButton from '@shared/Buttons/AddTitleButton/AddTitleButton';

const SimpleLink: React.FC = () => {
  const initialValues = {
    element_header: '',
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
                name='element_header'
                placeholder='Element Header'
                required={true}
                elementInput={true}
                icon={false}
              />

              <AddTitleButton title='Add Link' />
            </form>
          );
        }}
      </FormikContainer>

      <LinkCard />
      <LinkCard />
      <LinkCard />
      <LinkCard />
    </div>
  );
};

export default SimpleLink;
