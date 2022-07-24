import MainContainer from "@sections/MainContainer/MainContainer";
import SectionContainer from "@sections/SectionContainer/SectionContainer";
import React from "react";
import Styles from "./test5.module.scss";

const test5 = () => {
  return (
    <MainContainer>
      <SectionContainer title="Links">
        <div className={Styles.container}>
          <div className={Styles.container__content}>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className={Styles.container__content__slide}>
                <div className={Styles.container__content__slide__imgContent}>
                  <img src="/assets/images/Events3.svg" alt="Images" />
                </div>
                <div className={Styles.container__content__slide__textContent}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
        ;
      </SectionContainer>
    </MainContainer>
  );
};

export default test5;
