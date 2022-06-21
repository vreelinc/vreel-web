import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";
import { FormikContainer } from "src/services/formik/FormikContainer";
import FormikControl from "src/services/formik/FormikControl";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import AdvancedSlide from "./AdvencedSlide/AdvancedSlide";
import CallToActions from "./CallToActions/CallToActions";
import Collapse from "src/components/Shared/Collapse/Collapse";
import Styles from "./Slide.module.scss";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import SlidesToggleButton from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import { useDispatch } from "react-redux";
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
const Slide = ({ initialValues, level_1, refetch }) => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const dispatch = useDispatch();
  const [updateSlide] = useMutation(UPDATE_SLIDE);
  const [removeSlide] = useMutation(REMOVE_SLIDE);
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
        toast.success(`${level_1} updated!`);
        console.log({ res });
      })
      .catch((err) => {
        toast.error("This didn't work.");
        console.log(err);
      });
  };

  return (
    <FormikContainer initialValues={initialValues}>
      {(formik) => {
        console.log(formik);

        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formik.values);
              // console.log(formik.values);
            }}
          >
            <div className={Styles.slideBody__saveBtn}>
              <SlideActionsBtn
                title="Save"
                bgColor="green"
                padding="8px 20px"
                actions={() => {}}
                type="submit"
              />
            </div>
            <Collapse title="Title" level_1={level_1} level={2}>
              <FormikControl
                control="input"
                type="text"
                name="title.header"
                placeholder="Header"
                slideinput={true}
              />
              <FormikControl
                control="textarea"
                type="text"
                name="title.description"
                placeholder="Description"
              />
            </Collapse>
            <Collapse title="Media" level_1={level_1} level={2}>
              <div className={Styles.slideBody__media}>
                <FormikControl control="media" name="mobile" />
                <FormikControl control="media" name="desktop" />
              </div>
              <div className={Styles.slideBody__toggleBtnContainer}>
                <SlidesToggleButton
                  bgColor="transparent"
                  width={78}
                  height={23}
                  firstTitle="On"
                  secondTitle="Off"
                  name="media_sound"
                />
                <span>Media File Sound</span>
              </div>
            </Collapse>
            <Collapse
              title="Call-To-Action Button #1"
              level_1={level_1}
              level={2}
            >
              <CallToActions name="cta1" />
            </Collapse>
            <Collapse
              title="Call-To-Action Button #2"
              level_1={level_1}
              level={2}
            >
              <CallToActions name="cta2" />
            </Collapse>
            <Collapse title="Advanced" level_1={level_1} level={2}>
              <AdvancedSlide
                level_1={level_1}
                level_2={`${level_1}_Advanced`}
              />
            </Collapse>

            <div className={Styles.delBtn}>
              <SlideActionsBtn
                title="Delete Slide"
                bgColor="red"
                padding="8px 20px"
                actions={() => {
                  toast((t) => (
                    <div>
                      <p style={{ padding: "0 0 10px" }}>
                        Are you sure to <b style={{ color: "red" }}>delete?</b>
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
                                toast.success(`${level_1} deleted!`);
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
          </form>
        );
      }}
    </FormikContainer>
  );
};

export default React.memo(Slide);
//
