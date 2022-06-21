import React from 'react';
import { Formik } from 'formik';

export const FormikContainer = ({
  children,
  initialValues,
  validationSchema,
}: any) => {
  const onSubmit = async (values, submitProps) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {children}
    </Formik>
  );
};
