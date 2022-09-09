import React, { useEffect, useState } from "react";
import Link from "next/link";

import Styles from "./DesktopSettings.module.scss";
import PersonalInfoFields from "../PersonalInfo/PersonalInfoFields";
import AccountCompletionStatus from "./childrens/AccountCompletionStatus/AccountCompletionStatus";
import AccountLoginInfo from "./childrens/AccountLoginInfo/AccountLoginInfo";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import AccountSensitivity from "../PersonalInfo/AccountSensitivity";
import { FormikContainer } from "@formik/FormikContainer";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@graphql/mutations";

type Props = { data: any };
const AccountKeys = [
  "first_name", "last_name", "email", "prefix", "website",
  "suffix", "work_phone", "cell_phone", "home_phone", "job_title", "profile_picture",
  "company_name", "business_address", "home_address",
  "landing_page", "middle_initial", "self_portrait_image", "self_landscape_image", "linkedin_url", "note", "pages_ref", "pages", "v_email"
]
const DesktopSettings = ({ data }: Props) => {
  const [cookies] = useCookies(["userAuthToken"]);
  const [updateUser] = useMutation(UPDATE_USER);
  const [currentVals, setCurrentVals] = useState(data);

  function handleSubmit() {
    const fields = [];
    for (const [field, value] of Object.entries(currentVals)) {
      if (AccountKeys.includes(field)) {
        fields.push({ field, value })
      }
    };
    console.log("fields!!", fields)
    updateUser({
      variables: {
        token: cookies.userAuthToken,
        fields
      }
    })
      .then((res) => console.log(res))
      .catch(err => alert(err.message))
  };

  useEffect(() => {
    console.log(currentVals)
  }, [currentVals])
  return (
    <FormikContainer initialValues={data} >
      {(formik) => {
        setCurrentVals(formik.values)
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
                    <button onClick={handleSubmit}>Submit</button>
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
