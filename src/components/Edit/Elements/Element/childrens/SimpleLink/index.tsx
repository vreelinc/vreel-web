import React from "react";
import { FormikContainer } from "src/components/formik/FormikContainer";
import FormikControl from "src/components/formik/FormikControl";
import AddTitleButton from "src/components/Shared/Buttons/AddTitleButton/AddTitleButton";
import ChildInput from "src/components/Shared/Inputs/ChildInput";
import Styles from "../Children.module.scss";
import LinkCard from "./LinkCard";

const SimpleLink: React.FC = () => {
  const initialValues = {
    element_header: "",
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
                control="input"
                type="text"
                name="element_header"
                placeholder="Element Header"
                required={true}
                elementInput={true}
                icon={false}
              />

              <AddTitleButton title="Add Link" />
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
