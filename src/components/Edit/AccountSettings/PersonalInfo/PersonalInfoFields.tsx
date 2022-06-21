import React from 'react';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';

type Props = {};

const PersonalInfoFields = (props: Props) => {
  return (
    <FormikContainer>
      {(formik) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //   handleLogin(formik.values);
            }}
          >
            <FormikControl
              control='input'
              type='text'
              placeholder='First Name'
              name='first_name'
              required={true}
              slideinput={true}
            />

            <FormikControl
              control='input'
              type='text'
              placeholder='Last Name'
              name='last_name'
              required={true}
              slideinput={true}
            />

            <FormikControl
              control='input'
              type='text'
              placeholder='Middle Intial '
              name='middle_intial'
              required={true}
              slideinput={true}
            />

            <FormikControl
              control='input'
              type='text'
              placeholder='Prefix'
              name='prefix'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='text'
              placeholder='Suffix'
              name='suffix'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='text'
              placeholder='Company Name'
              name='company_name'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='text'
              placeholder='Title'
              name='title'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='text'
              placeholder='Landing Page'
              name='landing_page'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='text'
              placeholder='Address'
              name='address'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='text'
              placeholder='Work Phone'
              name='work_phone'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='text'
              placeholder='Cell Phone'
              name='cell_phone'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='input'
              type='telephone'
              placeholder='House Phone'
              name='house_phone'
              required={true}
              slideinput={true}
            />

            <FormikControl
              control='input'
              type='email'
              placeholder='Email'
              name='email'
              required={true}
              slideinput={true}
            />

            <FormikControl
              control='input'
              type='text'
              placeholder='Sound'
              name='sound'
              required={true}
              slideinput={true}
            />
            <FormikControl
              control='textarea'
              type='text'
              placeholder='Notes'
              name='notes'
              required={true}
              slideinput={true}
            />
          </form>
        );
      }}
    </FormikContainer>
  );
};

export default PersonalInfoFields;
