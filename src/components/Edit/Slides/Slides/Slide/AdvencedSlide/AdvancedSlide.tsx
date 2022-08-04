import React from "react";
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
import { useFormikContext } from "formik";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import Switch from "@formik/common/Switch/Switch";

const AdvancedSlide: React.FC<{ formik: any }> = ({ formik }) => {
  const { values } = useFormikContext();
  console.log({ val: values });

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
              <div>
                <select className={Styles.select}>
                  <option value={"audio"}>Source Audio File</option>
                </select>
                <FormikControl
                  name="advanced.background_audio_url"
                  control="input"
                  placeholder="URL"
                  type="text"
                  slideinput={true}
                  advanced={true}
                />
              </div>
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
            {/* <LogoBtn formik={formik} /> */}
          </div>
        </div>
        <p className={Styles.moreInfo__text}>More Info</p>
      </div>

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
        <FormikControl
          control="rich_textarea"
          type="text"
          name="info.description"
          placeholder="Info"
          onChange={formik.handleChange}
        />
      </div>

      <div className={Styles.linksGroup}>
        {[
          { title: "Create Slide NFT", desc: "Select Marketplace" },
          { title: "Invite Collabrator", desc: "Search Username/Email" },
          { title: "Add Creadits", desc: "Search Username/Email" },
          { title: "Add Group", desc: "Search Group" },
        ].map((item, index) => (
          <div key={index} className={Styles.linksGroup__mainContent}>
            <div
              className={clsx(
                Styles.linksGroup__container,
                item.title === "Create Slide NFT"
                  ? Styles.linksGroup__active
                  : Styles.linksGroup__deactive
              )}
            >
              <div className={Styles.linksGroup__container__content}>
                <p className={Styles.linksGroup__container__content__title}>
                  {(item.title === "Add Creadits" ||
                    item.title === "Add Group") && (
                    <FaPlus style={{ marginRight: "5px" }} />
                  )}

                  {item.title}
                </p>
                <p>{item.desc}</p>
                {(item.title === "Create Slide NFT" ||
                  item.title === "Add Group") && (
                  <select className={Styles.select}>
                    <option value={"audio"}>Open Source</option>
                  </select>
                )}
                {item.title === "Invite Collabrator" && (
                  <FormikControl
                    name={`advanced.collabrator.username`}
                    control="input"
                    placeholder="Username/Email"
                    type="text"
                    slideinput={true}
                    advanced={true}
                  />
                )}

                {item.title === "Add Creadits" && (
                  <>
                    <div className="mb-10">
                      <FormikControl
                        name={`advanced.creadits.username`}
                        control="input"
                        placeholder="Username/Email"
                        type="text"
                        slideinput={true}
                        advanced={true}
                      />
                    </div>
                    <div
                      className={
                        Styles.linksGroup__container__content__addCreadits
                      }
                    >
                      <div>
                        <BiSearchAlt2 />
                      </div>
                      <p>Creadits</p>
                      <div>
                        <AiOutlineCloseCircle />
                      </div>
                    </div>
                  </>
                )}
                <div style={{ marginTop: "12px" }}>
                  <SubmitBtn />
                </div>
              </div>
            </div>
            {item.title !== "Create Slide NFT" && (
              <div className={Styles.linksGroup__bottom}>
                <div className={Styles.linksGroup__bottom__container}>
                  <div
                    className={
                      Styles.linksGroup__bottom__container__logoContainer
                    }
                  >
                    <div
                      className={
                        Styles.linksGroup__bottom__container__logoContainer__logo
                      }
                    >
                      <img src="/assets/vreel-profile.png" alt="Profile-Icon" />
                    </div>
                    <div
                      className={
                        Styles.linksGroup__bottom__container__logo__text
                      }
                    >
                      <p style={{ fontSize: "14px", paddingBottom: "5px" }}>
                        Vreel
                      </p>
                      <p style={{ fontSize: "10px" }}>Collaborator - Pending</p>
                    </div>
                  </div>
                  <button
                    className={Styles.linksGroup__bottom__container__cross}
                  >
                    <img src="/assets/icons/cross_icon.svg" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSlide;
