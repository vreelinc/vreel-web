import React from "react";
import Link from "next/link";

import Styles from "./DesktopSettings.module.scss";
import PersonalInfoFields from "../PersonalInfo/PersonalInfoFields";
import AccountCompletionStatus from "./childrens/AccountCompletionStatus/AccountCompletionStatus";
import AccountLoginInfo from "./childrens/AccountLoginInfo/AccountLoginInfo";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import AccountSensitivity from "../PersonalInfo/AccountSensitivity";
import { FormikContainer } from "@formik/FormikContainer";

type Props = {};

const DesktopSettings = (props: Props) => {
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
            <div className={Styles.desktop}>
              <div className={Styles.desktop__container}>
                <div className={Styles.desktop__container__usersLogo}>
                  <img src="/assets/icons/users.svg" alt="Users icons" />
                  <span>Vreel</span>
                </div>
                <div className={Styles.desktop__container__personalInfo}>
                  <div
                    className={
                      Styles.desktop__container__personalInfo__leftSides
                    }
                  >
                    <p>
                      Personal Information <br />
                      vCard
                    </p>
                    <PersonalInfoFields />
                  </div>

                  <div
                    className={
                      Styles.desktop__container__personalInfo__rightSides
                    }
                  >
                    {/* frist row */}
                    <div
                      className={
                        Styles.desktop__container__personalInfo__rightSides__firstRow
                      }
                    >
                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__firstRow__fristColumn
                        }
                      >
                        <div>
                          <p>Share Your Vreel</p> <p>Login Here!</p>
                        </div>
                        <CopyLinkBtn name="Copy Link" icon={true} />
                      </div>

                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__firstRow__secondColumn
                        }
                      >
                        <img
                          src="/assets/images/female.png"
                          alt="profile Pic"
                        />
                        <Link href={"/"}>
                          <a>Change Profile Picture</a>
                        </Link>
                      </div>

                      <AccountSensitivity />
                    </div>

                    {/* second row */}
                    <div
                      className={
                        Styles.desktop__container__personalInfo__rightSides__secondRow
                      }
                    >
                      <h3>VREEL Account Completion Status</h3>
                      <AccountCompletionStatus />
                    </div>

                    {/* Third row */}
                    <div
                      className={
                        Styles.desktop__container__personalInfo__rightSides__thirdRow
                      }
                    >
                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__thirdRow__firstColumn
                        }
                      >
                        <h4>Account Login Information</h4>

                        <AccountLoginInfo />
                      </div>
                      <div
                        className={
                          Styles.desktop__container__personalInfo__rightSides__thirdRow__secondColumn
                        }
                      ></div>
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

export default DesktopSettings;
