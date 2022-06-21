import React, { useState } from "react";
import Styles from "./UploadBtn.module.scss";
import { BiUpload } from "react-icons/bi";
import UppyModal from "@shared/UppyModal/UppyModal";

const UploadBtn = () => {
  const [open, setOpen] = useState(false);
  function modalOpen() {
    setOpen(!open);
  }
  return (
    <>
      <div onClick={modalOpen} className={Styles.uploadBtn}>
        <button>
          <span>Upload Your Files</span>
          <BiUpload className={Styles.icon} />
        </button>
      </div>
      <UppyModal open={open} setOpen={setOpen} />
    </>
  );
};

export default UploadBtn;
