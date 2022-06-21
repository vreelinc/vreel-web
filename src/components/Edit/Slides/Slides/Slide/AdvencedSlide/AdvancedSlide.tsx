import React, { useCallback, useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import Styles from "./AdvancedSlide.module.scss";
import clsx from "clsx";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import FormikControl from "src/components/formik/FormikControl";
import LogoBtn from "src/components/Shared/Buttons/SlidesBtn/AdvancedLogoBtn/LogoBtn";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import Collapse from "../../../../../../common/Collapse/Collapse";

const AdvancedSlide: React.FC<{
  level_1: String;
  level_2: String;
}> = ({ level_1, level_2 }) => {
  return (
    <div>
      <Collapse title="More Info" level_2={level_2} level_1={level_1} level={3}>
        <FormikControl
          control="input"
          type="text"
          name="advanced.header"
          placeholder="Header"
          slideinput={true}
        />
        <FormikControl
          control="rich_textarea"
          type="text"
          name="advanced.info"
          placeholder="Info"
        />
      </Collapse>
      <div className={Styles.moreInfo}>
        <div className={Styles.moreInfo__flex}>
          <div className={Styles.moreInfo__flex__left}>
            <LogoBtn />
          </div>
          <div className={Styles.moreInfo__flex__right}>
            {[
              "Add Collaborator",
              "Create Slide NFT",
              "Add Creadits",
              "Add Group",
            ].map((item, index) => (
              <div className={Styles.moreInfo__flex__right__button} key={index}>
                <SlideActionsBtn
                  title={item}
                  bgColor="#FF7A00"
                  Icon={BsPlusCircle}
                  width="100%"
                  padding="7px 6px"
                  actions={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={Styles.moreInfo__toggleBtn}>
        <SlidesToggleButton
          bgColor="green"
          firstTitle="Light"
          secondTitle="Dark"
          width={114}
          height={33}
          firstInnerText="Switch for Dark Mode"
          secondInnertext="Switch For Light Mode"
          name="advanced_toggle_switch"
        />
      </div>
    </div>
  );
};

export default AdvancedSlide;
