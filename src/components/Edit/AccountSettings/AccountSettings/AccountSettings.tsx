import React from "react";
import DesktopSettings from "../DesktopSetting/DesktopSettings";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import Styles from "./AccSettings.module.scss";

type Props = {};

const AccountSettings = (props: Props) => {
  return (
    <div className={Styles.accSettingsContainer}>
      <DesktopSettings />
      <PersonalInfo />
    </div>
  );
};

export default AccountSettings;
