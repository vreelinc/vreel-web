import React from "react";
import Styles from "./Test3.module.scss";

const Test3 = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        maxHeight: "600px",
        overflow: "hidden",
        margin: "auto",
        boxSizing: "border-box",
      }}
    >
      <div className={Styles.grid}>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
        <div>
          <img src="/assets/images/Events1.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Test3;
