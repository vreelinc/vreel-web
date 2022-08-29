import React, { useEffect, useRef, useState } from "react";
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
import { setActiveIndex } from "@redux/createSlice/previewSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import clsx from "clsx";
import ToggleButton from "@shared/Buttons/ToggleButton/ToggleButton";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import useWindowDimensions from "@hooks/useWindowDimensions";
import {
  removeFromParent,
  setParent,
} from "@redux/createSlice/createHeightSlice";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { toggleChangesFag } from "@redux/createSlice/trackChangesSlice";
import { changes } from "@edit/Layout/Mobile/MobileDashboard";
import AdvancedLinksGroup from "./AdvencedSlide/AdvancedLinksGroup";
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
const Slide = ({ initialValues, title, refetch, index }) => {
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  const [updateSlide] = useMutation(UPDATE_SLIDE);
  const [removeSlide] = useMutation(REMOVE_SLIDE);
  const ref = useRef(null);
  const [height, setHeight] = useState(false);

  const handleHeight = () => {
    setHeight(!height);
  };

  const handleSubmit = async (values) => {
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
      })
      .catch((err) => {
        toast.error("This didn't work.");
        console.log(err);
      });
  };
  // console.log({ cookies });
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(`${Styles.hide}`);
          entry.target.classList.add(`${Styles.show}`);
        } else {
          entry.target.classList.remove(`${Styles.show}`);
          entry.target.classList.add(`${Styles.hide}`);
        }
      });
    });
    if (ref.current) {
      ref.current.childNodes.forEach((item) => {
        observer.observe(item);
      });
    }
  }, [ref, height]);

  return (
    <Draggable draggableId={initialValues.id} index={index}>
      {(provided, snapShot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <FormikContainer initialValues={initialValues}>
            {(formik) => {
              // console.log(formik.values.title.header);

              // if (formik.values.title.header == "hello 55")
              //   console.log(formik.values);
              if (
                JSON.stringify(formik.values) != JSON.stringify(initialValues)
              ) {
                // if (!changesFag) {
                //   console.log(formik);
                //   dispatch(toggleChangesFag());
                //   console.log("changed to true...............");
                // }
                changes["slide"][formik.values.id] = formik.values;
                changes["slide"]["refetch"] = refetch;
                // console.log({
                //   init: initialValues.title.header,
                //   curr: formik.values.title.header,
                // });
              }
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
                            name="active"
                            backgroundColor="white"
                            height="23"
                            activeTitle="Hide"
                            activeBackground="#61FF00"
                            activeIcon={<AiOutlineEye />}
                            deactiveTitle="Show"
                            deactiveBackground="#a3a1a1"
                            deactiveIcon={<AiOutlineEyeInvisible />}
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
                          {height ? (
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
                          className={
                            Styles.slideContainer__collapse__text__title
                          }
                        >
                          {initialValues.title.header
                            ? initialValues.title.header
                            : "No title"}
                        </span>
                        <span {...provided.dragHandleProps}>
                          <img src="/assets/icons/dots.svg" alt="Dots" />
                        </span>
                      </div>
                    </div>

                    <div
                      className={Styles.slide}
                      style={{ height: `${height ? "max-content" : "0"}` }}
                    >
                      <div className={Styles.slideBody} ref={ref}>
                        <div className={clsx(Styles.slideBody__titleSection)}>
                          <p style={{ paddingBottom: "18px" }}>Title</p>
                          <div className="mb-10">
                            <FormikControl
                              control="input"
                              type="text"
                              name="title.header"
                              placeholder="Header"
                              slideinput={true}
                              onChange={formik.handleChange}
                            />
                          </div>
                          <FormikControl
                            control="textarea"
                            type="text"
                            name="title.description"
                            placeholder="Description"
                          />
                        </div>

                        <div className={clsx(Styles.slideBody__media)}>
                          <div className={Styles.slideBody__media__header}>
                            <p>Media</p>
                            <div
                              className={
                                Styles.slideBody__media__header__toggle
                              }
                            >
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

                        <div className={clsx(Styles.slideBody__callToActions)}>
                          <div
                            className={Styles.slideBody__callToActions__title}
                          >
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

                        <div className={clsx(Styles.slideBody__callToActions)}>
                          <div
                            className={Styles.slideBody__callToActions__title}
                          >
                            <p>Call-To-Action Button #2</p>
                          </div>
                          <CallToActions
                            name="cta2"
                            link_type={
                              formik.values.cta2.link_type
                                ? formik.values.cta2.link_type
                                : "URL"
                            }
                          />
                        </div>

                        <div className={clsx(Styles.slideBody__advanced)}>
                          <div className={Styles.slideBody__advanced__title}>
                            <p>Advanced</p>
                          </div>
                          <AdvancedSlide formik={formik} />
                        </div>

                        <div style={{ transition: "200ms" }}>
                          <AdvancedLinksGroup />
                          <div
                            className={clsx(Styles.slideBody__upArrows)}
                            onClick={handleHeight}
                          >
                            <img
                              src="/assets/icons/up-arrow-light.svg"
                              alt="Up Arrow"
                            />
                          </div>
                        </div>

                        <div className={clsx(Styles.slideBody__btnContainer)}>
                          <div
                            className={Styles.slideBody__btnContainer__delBtn}
                          >
                            <SlideActionsBtn
                              title="Delete"
                              bgColor="red"
                              padding="8px 23px"
                              borderRadius="8px"
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
                                              toast.success(
                                                `${title} deleted!`
                                              );
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
                            className={Styles.slideBody__btnContainer__saveBtn}
                          >
                            <SlideActionsBtn
                              title="Save"
                              bgColor="#61ff00"
                              padding="8px 23px"
                              borderRadius="8px"
                              actions={() => {}}
                              type="submit"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              );
            }}
          </FormikContainer>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Slide);
//
