import MainContainer from "@sections/MainContainer/MainContainer";
import SectionContainer from "@sections/SectionContainer/SectionContainer";
import React from "react";
import Styles from "./TestingVLinks.module.scss";

type Props = {};

const TestingVLinks = (props: Props) => {
  return (
    <MainContainer>
      <SectionContainer title="Test">
        <div className={Styles.test}>
          <div>
            {/* <img src="/assets/images/regLogBg.png" /> */}
            <div>
              <img src="/assets/images/regLogBg.png" />
            </div>
          </div>
          <div></div>
          <div></div>
          <div>
            {/* <img src="/assets/images/regLogBg.png" /> */}
            <div>
              <img src="/assets/images/regLogBg.png" />
            </div>
          </div>
          <div>
            {/* <img src="/assets/images/regLogBg.png" /> */}
            <div>
              <img src="/assets/images/regLogBg.png" />
            </div>
          </div>
          <div></div>
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default TestingVLinks;
