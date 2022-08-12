import React, { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import Styles from "./Alert.module.scss";

const Alert = ({ open, yesCallback, noCallback, text }) => {
  return open ? (
    <div className={Styles.alert_container}>
      <div className={Styles.alert_content}>
        <h3> {text}</h3>
        <div className={Styles.button_container}>
          <button onClick={noCallback} className={Styles.alert_no_btn}>
            No
          </button>
          <button className={Styles.alert_yes_btn} onClick={yesCallback}>
            Yes
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Alert;
