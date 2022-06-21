import React from 'react';
import Link from 'next/link';
import Styles from './PersonalInfo.module.scss';
import PersonalInfoFields from './PersonalInfoFields';
import CopyLinkBtn from '@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn';
import SlideActionsBtn from '@shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn';

type Props = {};

const PersonalInfo = (props: Props) => {
  return (
    <div className={Styles.personalInfoContainer}>
      <div className={Styles.personalInfoContainer__title}>
        <span>Personal Information</span>
        <SlideActionsBtn
          actions={() => {}}
          bgColor='green'
          padding='6px 16px'
          title='Save'
        />
      </div>

      <div className={Styles.personalInfoContainer__inputContainer}>
        <div className={Styles.personalInfoContainer__inputContainer__topText}>
          <Link href={'/'}>
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
