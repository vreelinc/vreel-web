import React from "react";
import Styles from "./AdvancedSlide.module.scss";
import FormikControl from "src/services/formik/FormikControl";
import LogoBtn from "src/components/Shared/Buttons/SlidesBtn/AdvancedLogoBtn/LogoBtn";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import SubmitBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SubmitBtn";
import { CgClose } from "react-icons/cg";
import clsx from "clsx";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const AdvancedSlide: React.FC<{ formik: any }> = ({ formik }) => {
  return (
    <div>
      <div className={Styles.moreInfo}>
        <div className={Styles.moreInfo__flex}>
          <div className={Styles.moreInfo__flex__left}>
            <p>Switch For Dark Mode</p>
            <div className={Styles.moreInfo__toggleBtn}>
              <SlidesToggleButton
                bgColor="green"
                firstTitle="Light"
                secondTitle="Dark"
                width={90}
                height={26}
                firstInnerText="Dark"
                secondInnertext="Light"
                name="advanced.isDarkMode"
              />
            </div>
            <p>Slide Background Audio</p>
            <div>
              <select className={Styles.select}>
                <option value={"audio"}>Source Audio File</option>
              </select>
              <FormikControl
                name={`advanced.link_url`}
                control="input"
                placeholder="URL"
                type="text"
                slideinput={true}
                advanced={true}
              />
            </div>
          </div>

          <div className={Styles.moreInfo__flex__right}>
            <LogoBtn />
          </div>
        </div>
        <p className={Styles.moreInfo__text}>More Info</p>
      </div>

      <div>
        <FormikControl
          control="input"
          type="text"
          name="info.title"
          placeholder="Header"
          slideinput={true}
        />
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
                <p style={{ fontWeight: "600", paddingBottom: "10px" }}>
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
                    <FormikControl
                      name={`advanced.creadits.username`}
                      control="input"
                      placeholder="Username/Email"
                      type="text"
                      slideinput={true}
                      advanced={true}
                    />
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
                <SubmitBtn />
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
                    <CgClose />
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
