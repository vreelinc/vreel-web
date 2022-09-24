import React from "react";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";

type Props = {};

const PersonalInfoFields = (props: Props) => {
  return (
    <div className="account-form">
      <FormikControl
        control="input"
        type="text"
        placeholder="First Name"
        name="first_name"

        slideinput={true}
      />

      <FormikControl
        control="input"
        type="text"
        placeholder="Last Name"
        name="last_name"

        slideinput={true}
      />

      {/* <FormikControl
        control="input"
        type="text"
        placeholder="Middle Intial "
        name="middle_intial"

        slideinput={true}
      /> */}

      <FormikControl
        control="input"
        type="text"
        placeholder="Prefix"
        name="prefix"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Suffix"
        name="suffix"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Company Name"
        name="companyName"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Job Title"
        name="job_title"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Landing Page"
        name="landing_page"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Home Address"
        name="home_address"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Business Address"
        name="business_address"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Work Phone"
        name="work_phone"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Cell Phone"
        name="cell_phone"

        slideinput={true}
      />


      <FormikControl
        control="input"
        type="email"
        placeholder="Email"
        name="email"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="Notes"
        name="note"

        slideinput={true}
      />
      <FormikControl
        control="input"
        type="text"
        placeholder="LinkedIn"
        name="linkedinUrl"

        slideinput={true}
      />
    </div>
  );
};

export default PersonalInfoFields;
