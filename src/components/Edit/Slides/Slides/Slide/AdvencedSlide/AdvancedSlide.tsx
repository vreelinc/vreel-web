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
    <div style={{ padding: "6px 5px" }}>
      <div className={Styles.moreInfo}>
        <div className={Styles.moreInfo__flex}>
          <div className={Styles.moreInfo__flex__left}>
            <div>
              <p>Switch For Dark Mode</p>
              <div className={Styles.moreInfo__toggleBtn}>
                <span>
                  <Switch name="advanced.isDarkMode" />
                </span>
              </div>
            </div>
            <div>
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

          <div>
            <SlideLogo />
          </div>
        </div>
        <p className={Styles.moreInfo__text}>More Info</p>
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
      </div>
    </div>
  );
};

export default AdvancedSlide;
