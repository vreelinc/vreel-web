import React, { useEffect, useRef, useState } from "react";
import Slide from "./Slide/Slide";
import { BsPlus } from "react-icons/bs";
import Styles from "./Slides.module.scss";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import clsx from "clsx";
import PreviewSliders from "../Preview/PreviewSliders/PreviewSliders";
import Collapse from "src/components/Shared/Collapse/Collapse";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import ToggleButtonPreview from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/ToggleButtonPreview";
const GET_SLIDES = gql`
  query User($token: String!) {
    getUserByToken(token: $token) {
      vreel {
        slides {
          id
          slide_location
          content_type
          uri
          title {
            header
            description
          }
          mobile {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          desktop {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
          advanced {
            link_type
            header
            logoUrl
            isDarkMode
            header
            background_audio_url
            background_audio_source
          }
        }
      }
    }
  }
`;
const CREATE_SLIDE = gql`
  mutation CreateSlide($token: String!) {
    createSlide(token: $token) {
      id
      slide_location
      content_type
      uri
    }
  }
`;
const Slides = () => {
  const [preview, setPreview] = useState(false);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [createSlide] = useMutation(CREATE_SLIDE);
  const { loading, error, data, refetch } = useQuery(GET_SLIDES, {
    variables: {
      token: cookies.userAuthToken,
    },
  });

  if (loading || error || !data) return <div></div>;
  console.log({ slides: data.getUserByToken.vreel.slides });
  return (
    <div className={Styles.slidesContainer}>
      <div className={Styles.slidesContainer__leftSides}>
        <div className={Styles.slides}>
          <div className={Styles.slides__addSlides}>
            <span>Slides</span>
            <SlideActionsBtn
              Icon={BsPlus}
              title="Add Slide"
              padding="8px 20px"
              bgColor="green"
              actions={() => {
                const nextNo = data.getUserByToken.vreel.slides.length + 1;
                createSlide({
                  variables: {
                    token: cookies.userAuthToken,
                  },
                })
                  .then((res) => {
                    refetch();
                    toast.success(`New Slide ${nextNo} added!`);
                    console.log({ res });
                  })
                  .catch((err) => {
                    toast.error("This didn't work.");
                    console.log(err);
                  });
              }}
            />
          </div>

          {data.getUserByToken.vreel.slides.map((e, l1_index) => (
            <Collapse key={l1_index} title={`Slides ${l1_index + 1}`} level={1}>
              <Slide
                level_1={`Slides ${l1_index + 1}`}
                initialValues={e}
                refetch={refetch}
              />
            </Collapse>
          ))}
        </div>
      </div>
      {/* Right side  */}
      <div className={Styles.slidesContainer__rightSlides}>
        <div
          className={clsx(
            Styles.slidesContainer__rightSlides__container,
            preview && Styles.active
          )}
        >
          <div
            className={
              Styles.slidesContainer__rightSlides__container__prevToggleBtn
            }
            onClick={() => setPreview(!preview)}
          >
            <div>
              <ToggleButtonPreview on={preview} setOn={setPreview} />
              <p>Toggle For {!preview ? "Desktop" : "Mobile"} View</p>
            </div>
          </div>
          {/* <div>{preview ? <DesktopPreview /> : <MobilePreview />}</div> */}
          <div>
            {preview ? (
              <PreviewSliders view="Desktop" />
            ) : (
              <PreviewSliders view="Mobile" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slides;
