import React, { useEffect, useRef, useState } from "react";
import Styles from "./AdvancedSlide.module.scss";
import FormikControl from "src/services/formik/FormikControl";
import { SlideLogo } from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SlideLogo";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import SubmitBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SubmitBtn";
import { FaPlus } from "react-icons/fa";
import clsx from "clsx";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Field, useFormikContext } from "formik";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import Switch from "@formik/common/Switch/Switch";
import useDebounce from "@hooks/useDebounce";

const AdvancedSlide: React.FC<{ formik: any }> = ({ formik }) => {
  const { values }: any = useFormikContext();

  return (
    <div>
      <div className={Styles.moreInfo}>
        <div className={Styles.moreInfo__flex}>
          <div className={Styles.moreInfo__flex__left}>
            <div>
              <p>Switch For Dark Mode</p>
              <div className={Styles.moreInfo__toggleBtn}>
                <span>
                  <Switch name="advanced.isDarkMode" firstTitle={"Light"} secondTitle={"Dark"} firstInnerText={"Dark"} secondInnertext={"Light"}/>
                </span>
              </div>
              <p>Dark mode for light media backgrounds, icons turn black</p>
            </div>
            <div className={Styles.moreInfo__backgroundAudio}>
              <p style={{ paddingTop: "1rem", paddingBottom: "0" }}>
                Slide Background Audio
              </p>
              <Field as="select" name="advanced.background_audio_source">
                <option value={"audio"}>Source Audio File</option>
                <option value={"icecast"}>Icecast</option>
                <option value={"mp3"}>Mp3</option>
              </Field>
              {/* <select onChange={(e) => updateAdvanced({ background_audio_source: e.target.value })} value={advanced?.background_audio_source} className={Styles.select}>
                <option value={"audio"}>Source Audio File</option>
                <option value={"icecast"}>IceCast</option>
                <option value={"mp3"}>Mp3</option>
              </select> */}
              <FormikControl
                name="advanced.background_audio_url"
                control="input"
                placeholder="URL"
                type="text"
                slideinput={true}
                advanced={true}
              />
            </div>

            <div>
              <p style={{ paddingTop: "1rem" }}>Background Audio Credit</p>
              <div style={{ padding: "0 21px" }}>
                <FormikControl
                  name={`advanced.link_url`}
                  control="input"
                  placeholder="Username / Email"
                  type="email"
                  slideinput={true}
                  advanced={true}
                />
              </div>
              <div className={Styles.moreInfo__flex__left__submit}>
                <select className={Styles.select}>
                  <option value={"Creadit"}>Creadit</option>
                </select>
                <span style={{ marginLeft: "5px" }}>
                  <SubmitBtn />
                </span>
              </div>
            </div>
          </div>

          <div className={Styles.moreInfo__slideLogo}>
            <SlideLogo />
          </div>
        </div>
        <div className={Styles.slideTiming}>
            <div className={Styles.slideTiming__label}>Set Slide Timing</div>
            <div className={Styles.slideTiming__rotate}>Rotate in</div>
            <div className={Styles.slideTiming__input}>
              <FormikControl
                  control="input"
                  type="text"
                  name="slide.timing"
                  placeholder="15"
                  slideinput={true}
              />
            </div>
            <div className={Styles.slideTiming__select}>
              <select >
                <option value={"seconds"}>seconds</option>
                <option value={"min"}>min</option>
                <option value={"hrs"}>hrs</option>
              </select>
            </div>
        </div>
        <p className={Styles.slideTiming__note}>Selected media will play on this slide for entire duration before rotating to the next slide</p>
        <p className={Styles.moreInfo__text}>More Info</p>
        <p className={Styles.slideTiming__note}>Describe more about your slide that you might not have had space to do & connect others to this slide with credits and collabs</p>
        <div className={Styles.moreInfo__richText}>
          <div className="mb-10">
            <FormikControl
              control="input"
              type="text"
              name="info.title"
              placeholder="Header"
              slideinput={true}
            />
          </div>
          <div>
            <FormikControl
              control="rich_textarea"
              type="text"
              name="info.description"
              placeholder="Info"
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className={Styles.display__color}>
          <span className={Styles.fonttitle}>Element Display Color</span>

          <div className={Styles.inputWrapper}>
            <FormikControl
                control="input"
                type="color"
                name="background"
                colorInput={true}
            />
            <FormikControl
                control="input"
                type="color"
                name="font"
                colorInput={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSlide;
