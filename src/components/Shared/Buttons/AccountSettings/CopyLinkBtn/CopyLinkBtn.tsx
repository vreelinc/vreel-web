import Link from "next/link";
import React from "react";
import Styles from "./CopyLinkBtn.module.scss";

type Props = {};

const CopyLinkBtn = (props: Props) => {
  return (
    <button className={Styles.copybutton}>
      <span>Copy Link</span>
      <img src="/assets/icons/link.svg" alt="Coipy Link Images" />
    </button>
  );
};

export default CopyLinkBtn;
