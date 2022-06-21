import Link from 'next/link';
import React from 'react';
import CopyLinkBtn from 'src/components/Shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn';
import ToggleButton from '../../DisplayOptions/Buttons/ToggleButton';
import PersonalInfoFields from '../PersonalInfo/PersonalInfoFields';
import AccountCompletionStatus from './childrens/AccountCompletionStatus';
import AccountLoginInfo from './childrens/AccountLoginInfo';
import Styles from './DesktopSettings.module.scss';

type Props = {};

const DesktopSettings = (props: Props) => {
  return (
    <div className={Styles.desktop}>
      <div className={Styles.desktop__container}>
        <div className={Styles.desktop__container__usersLogo}>
          <img src='/assets/icons/users.svg' alt='Users icons' />
          <span>Vreel</span>
        </div>
        <div className={Styles.desktop__container__personalInfo}>
          <div className={Styles.desktop__container__personalInfo__leftSides}>
            <p>
              Personal Information <br />
              vCard
            </p>
            <PersonalInfoFields />
          </div>

          <div className={Styles.desktop__container__personalInfo__rightSides}>
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
                <CopyLinkBtn />
              </div>

              <div
                className={
                  Styles.desktop__container__personalInfo__rightSides__firstRow__secondColumn
                }
              >
                <img src='/assets/images/female.png' alt='profile Pic' />
                <Link href={'/'}>
                  <a>Change Profile Picture</a>
                </Link>
              </div>

              <div
                className={
                  Styles.desktop__container__personalInfo__rightSides__firstRow__thirdColumn
                }
              >
                <p>Vreel Account</p>
                <Link href={'/'}>
                  <a className={Styles.active}>ACtive</a>
                </Link>
                <p style={{ paddingBottom: '0px' }}>Vreel Account</p>
                <p>Level</p>
                <div
                  className={
                    Styles.desktop__container__personalInfo__rightSides__firstRow__thirdColumn__help
                  }
                >
                  <Link href={'/'}>
                    <a> Basic</a>
                  </Link>
                  <img src='/assets/icons/help.svg' alt='help icons' />
                </div>
                <p>Account Sensitivity </p>
                <ToggleButton />
              </div>
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
  );
};

export default DesktopSettings;
