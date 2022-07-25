import AccountSensitivity from "@edit/AccountSettings/PersonalInfo/AccountSensitivity";
import PersonalInfoFields from "@edit/AccountSettings/PersonalInfo/PersonalInfoFields";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import LogoBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/LogoBtn";
import SlideActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import Link from "next/link";
import React from "react";
import Styles from "./Enterprise.module.scss";

type Props = {};
const initialValues = {
  name: "mobile" || "desktop",
  uri: "uri",
};

const Enterprise = (props: Props) => {
  return (
    <FormikContainer initialValues={initialValues}>
      {(formik) => {
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className={Styles.enterprise}>
              <div className={Styles.enterprise__container}>
                <div className={Styles.enterprise__container__title}>
                  <span>Personal Information</span>
                  <SlideActionsBtn
                    actions={() => {}}
                    bgColor="#61FF00"
                    padding="10px 24px"
                    title="Save"
                    borderRadius="8px"
                    color="#002116"
                  />
                </div>

                <div className={Styles.enterprise__container__inputContainer}>
                  <div
                    className={
                      Styles.enterprise__container__inputContainer__topText
                    }
                  >
                    <Link href={"/"}>
                      <span className={Styles.linkText}>
                        www.vreel.page/vreel
                      </span>
                    </Link>
                    <div
                      className={
                        Styles.enterprise__container__inputContainer__topText__btn
                      }
                    >
                      <div>
                        <CopyLinkBtn name="Copy Link" icon={true} />
                      </div>
                      <CopyLinkBtn
                        name="Card Replacement Request"
                        icon={false}
                        fontSize="11.5px"
                      />
                    </div>
                  </div>

                  <div
                    className={
                      Styles.enterprise__container__inputContainer__inputField
                    }
                  >
                    <PersonalInfoFields />
                    <div
                      className={
                        Styles.enterprise__container__inputContainer__inputField__addLogoContainer
                      }
                    >
                      <div
                        className={
                          Styles.enterprise__container__inputContainer__inputField__addLogoContainer__logoContent
                        }
                      >
                        <LogoBtn />
                      </div>
                      <div>
                        {/* <FormikControl control="media" name="mobile" />
                        <FormikControl control="media" name="desktop" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </FormikContainer>
  );
};

export default Enterprise;
