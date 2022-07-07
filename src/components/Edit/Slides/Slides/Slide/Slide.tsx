import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormikContainer } from "src/services/formik/FormikContainer";
import FormikControl from "src/services/formik/FormikControl";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import AdvancedSlide from "./AdvencedSlide/AdvancedSlide";
import CallToActions from "./CallToActions/CallToActions";
import Styles from "./Slide.module.scss";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@redux/store/store";
import { setActiveIndex, setPreviewObj } from "@redux/createSlice/previewSlice";
import * as AiIcons from "react-icons/ai";
import clsx from "clsx";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
const UPDATE_SLIDE = gql`
  mutation EditSlide($token: String!, $slideId: String!, $data: String!) {
    updateSlide(token: $token, slideId: $slideId, data: $data) {
      id
    }
  }
`;
const REMOVE_SLIDE = gql`
  mutation deleteSlide($token: String!, $slideId: String!) {
    removeSlide(token: $token, slideId: $slideId) {
      succeeded
      message
    }
  }
`;
const Slide = ({
  initialValues,
  title,
  refetch,
  index,
  active,
  handleActive,
}) => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const dispatch = useDispatch();
  const [updateSlide] = useMutation(UPDATE_SLIDE);
  const [removeSlide] = useMutation(REMOVE_SLIDE);
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  const handleHeight = () => {
    if (height === 0) {
      setHeight(ref?.current?.offsetHeight);
    } else {
      setHeight(0);
    }
    handleActive(index);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    updateSlide({
      variables: {
        token: cookies.userAuthToken,
        slideId: initialValues.id,
        data: JSON.stringify(values),
      },
    })
      .then((res) => {
        refetch();
        toast.success(`${title} updated!`);
        console.log({ res });
      })
      .catch((err) => {
        toast.error("This didn't work.");
        console.log(err);
      });
  };
  console.log(initialValues);

  return (
    <FormikContainer initialValues={initialValues}>
      {(formik) => {
        console.log(formik.values);
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formik.values);
              // dispatch(setPreviewObj(formik.values));
            }}
          >
            <div className={clsx(Styles.slideContainer)}>
              <div className={Styles.slideContainer__collapse}>
                <div className={Styles.slideContainer__collapse__button}>
                  <span>{title}</span>
                  <span>
                    <ToggleButton
                      name="show"
                      backgroundColor="white"
                      height="23"
                      activeTitle="Hide"
                      activeBackground="#61FF00"
                      activeIcon={<AiIcons.AiOutlineEye />}
                      deactiveTitle="Show"
                      deactiveBackground="#a3a1a1"
                      deactiveIcon={<AiIcons.AiOutlineEyeInvisible />}
                      color="black"
                    />
                  </span>

                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(setActiveIndex(index));
                      handleHeight();
                    }}
                  >
                    {active === index && height > 0 ? (
                      <img
                        src="/assets/icons/up-arrow-light.svg"
                        alt="Down Arrow Icon"
                      />
                    ) : (
                      <img
                        src="/assets/icons/down-arrow-light.svg"
                        alt="Up Arrow Icon"
                        className={Styles.collapseIcon}
                      />
                    )}
                  </span>
                </div>

                <div className={Styles.slideContainer__collapse__text}>
                  <span></span>
                  <span
                    className={Styles.slideContainer__collapse__text__title}
                  >
                    {initialValues.title.header
                      ? initialValues.title.header
                      : "Think circular"}
                  </span>
                  <button>
                    <img src="/assets/icons/dots.svg" alt="Dots" />
                  </button>
                </div>
              </div>

              <div
                style={{
                  height: `${active === index ? height : 0}px`,
                }}
                className={Styles.slide}
              >
                <div className={Styles.slideBody} ref={ref}>
                  <div className={Styles.slideBody__saveBtn}>
                    <SlideActionsBtn
                      title="Save"
                      bgColor="green"
                      padding="8px 20px"
                      actions={() => {}}
                      type="submit"
                    />
                  </div>

                  <div className={Styles.slideBody__titleSection}>
                    <p style={{ paddingBottom: "18px" }}>Title</p>
                    <FormikControl
                      control="input"
                      type="text"
                      name="title.header"
                      placeholder="Header"
                      slideinput={true}
                      onChange={formik.handleChange}
                    />
                    <FormikControl
                      control="textarea"
                      type="text"
                      name="title.description"
                      placeholder="Description"
                    />
                  </div>

                  <div className={Styles.slideBody__media}>
                    <div className={Styles.slideBody__media__header}>
                      <p>Media</p>
                      <div className={Styles.slideBody__media__header__toggle}>
                        <SlidesToggleButton
                          bgColor="green"
                          width={78}
                          height={23}
                          firstTitle="On"
                          secondTitle="Mute"
                          firstInnerText="Mute"
                          secondInnertext="On"
                          name="media_sound"
                        />
                        <span>Media File Sound</span>
                      </div>
                    </div>
                    <div className={Styles.slideBody__media__content}>
                      <FormikControl control="media" name="mobile" />
                    </div>
                    <div className={Styles.slideBody__media__content}>
                      <FormikControl control="media" name="desktop" />
                    </div>
                  </div>

                  <div className={Styles.slideBody__callToActions}>
                    <div className={Styles.slideBody__callToActions__title}>
                      <p>Call-To-Action Button #1</p>
                    </div>
                    <CallToActions
                      name="cta1"
                      link_type={
                        formik.values.cta1.link_type
                          ? formik.values.cta1.link_type
                          : "URL"
                      }
                    />
                  </div>

                  <div className={Styles.slideBody__callToActions}>
                    <div className={Styles.slideBody__callToActions__title}>
                      <p>Call-To-Action Button #2</p>
                    </div>
                    <CallToActions
                      name="cta2"
                      link_type={
                        formik.values.cta2.link_type
                          ? formik.values.cta1.link_type
                          : "URL"
                      }
                    />
                  </div>

                  <div className={Styles.slideBody__advanced}>
                    <div className={Styles.slideBody__advanced__title}>
                      <p>Advanced</p>
                    </div>
                    <AdvancedSlide formik={formik} />
                  </div>

                  <div className={Styles.slideBody__delBtn}>
                    <SlideActionsBtn
                      title="Delete Slide"
                      bgColor="red"
                      padding="8px 20px"
                      actions={() => {
                        toast((t) => (
                          <div>
                            <p style={{ padding: "0 0 10px" }}>
                              Are you sure to{" "}
                              <b style={{ color: "red" }}>delete?</b>
                            </p>
                            <div>
                              <button
                                type="button"
                                style={{
                                  background: "whitesmoke",
                                  color: "gray",
                                  padding: "3px 10px",
                                  margin: "0 5px 2px 0",
                                }}
                                onClick={() => toast.dismiss(t.id)}
                              >
                                Cancel
                              </button>
                              <button
                                style={{
                                  background: "red",
                                  color: "whitesmoke",
                                  padding: "3px 10px",
                                  margin: "0 5px 2px 0",
                                }}
                                type="button"
                                onClick={() => {
                                  removeSlide({
                                    variables: {
                                      token: cookies.userAuthToken,
                                      slideId: initialValues.id,
                                    },
                                  })
                                    .then((res) => {
                                      refetch();
                                      toast.success(`${title} deleted!`);
                                      console.log({ res });
                                    })
                                    .catch((err) => {
                                      toast.error("This didn't work.");
                                      console.log(err);
                                    });

                                  toast.dismiss(t.id);
                                }}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        ));
                      }}
                    />
                  </div>
                  <div
                    className={Styles.slideBody__upArrows}
                    onClick={handleHeight}
                  >
                    <img
                      src="/assets/icons/up-arrow-light.svg"
                      alt="Up Arrow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </FormikContainer>
  );
};

export default React.memo(Slide);
//
