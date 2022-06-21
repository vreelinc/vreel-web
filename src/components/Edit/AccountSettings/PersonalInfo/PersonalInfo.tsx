import Link from "next/link";
import React from "react";
import { FormikContainer } from "src/components/formik/FormikContainer";
import FormikControl from "src/components/formik/FormikControl";
import CopyLinkBtn from "src/components/Shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import Styles from "./PersonalInfo.module.scss";
import PersonalInfoFields from "./PersonalInfoFields";

type Props = {};

const PersonalInfo = (props: Props) => {
  return (
    <div className={Styles.personalInfoContainer}>
      <div className={Styles.personalInfoContainer__title}>
        <span>Personal Information</span>
        <SlideActionsBtn
          actions={() => {}}
          bgColor="green"
          padding="6px 16px"
          title="Save"
        />
      </div>

      <div className={Styles.personalInfoContainer__inputContainer}>
        <div className={Styles.personalInfoContainer__inputContainer__topText}>
          <Link href={"/"}>
            <span className={Styles.linkText}>www.vreel.page/vreel</span>
          </Link>
          <CopyLinkBtn />
        </div>

        <div
          className={Styles.personalInfoContainer__inputContainer__inputField}
        >
          <PersonalInfoFields />
          <div
            className={
              Styles.personalInfoContainer__inputContainer__inputField__addLogoContainer
            }
          >
            <div
              className={
                Styles.personalInfoContainer__inputContainer__inputField__addLogoContainer__addLogoBtn
              }
            >
              {/* <LogoBtn /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
