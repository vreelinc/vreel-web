import React, { useCallback, useEffect, useState } from "react";
import Slide from "./Slide/Slide";
import { BsPlus } from "react-icons/bs";
import Styles from "./Slides.module.scss";
import SlideActionsBtn from "src/components/Shared/Buttons/SlidesBtn/SlideActionsBtn/SlideActionsBtn";
import clsx from "clsx";
import PreviewSliders from "../Preview/PreviewSliders/PreviewSliders";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import ToggleButtonPreview from "src/components/Shared/Buttons/SlidesBtn/SlidesToggleButton/ToggleButtonPreview";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

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
          info {
            title
            description
            collaborators
            credits {
              credit_type
              accredited_id
            }
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

const SLIDE_UPDATE_LOCATION = gql`
  mutation updateSlideLocation(
    $token: String!
    $slideId: String!
    $location: Int!
  ) {
    updateSlideLocation(token: $token, slideId: $slideId, location: $location) {
      succeeded
      message
    }
  }
`;

const Slides = () => {
  const [preview, setPreview] = useState(false);
  const [active, setActive] = useState(null || Number);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [createSlide] = useMutation(CREATE_SLIDE);
  const [updateSlideLocation] = useMutation(SLIDE_UPDATE_LOCATION);

  const { loading, error, data, refetch } = useQuery(GET_SLIDES, {
    variables: {
      token: cookies.userAuthToken,
    },
  });
  const slideData = data?.getUserByToken?.vreel?.slides
    .map((item: any) => item)
    .sort((a: any, b: any) => {
      return a.slide_location - b.slide_location;
    });

  console.log({ slideData });
  const [slideState, setSlideState] = useState(slideData);
  console.log({ slideState });

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return null;
    console.log(result);
    const start = result.source.index;
    const end = result.destination.index;
    // const arr = [
    //   { index: 0, location: 1 },
    //   { index: 1, location: 2 },
    //   { index: 2, location: 3 },
    //   { index: 3, location: 4 },
    //   { index: 4, location: 5 },
    // ];
    // console.log(arr);
    // console.log(
    //   arr.slice(start > end ? end : start, start < end ? end : start)
    //   );

    console.log({ start, end });
    console.log(
      slideData.map((e) => {
        return {
          id: e.id,
          slide_location: e.slide_location,
        };
      })
    );

    const slicedData = [...slideData]
      .slice(start > end ? end : start + 1, start < end ? end + 1 : start)
      .map((e) => {
        return {
          id: e.id,
          slide_location:
            start < end ? e.slide_location - 1 : e.slide_location + 1,
        };
      });

    if (start < end) {
      slicedData.push({
        id: slideData[start].id,
        slide_location: end + 1,
      });
    } else {
      slicedData.unshift({
        id: slideData[start].id,
        slide_location: end + 1,
      });
    }

    console.log(slicedData, {
      id: slideData[start].id,
      slide_location: end + 1,
    });

    const allPromises = slicedData.map((slide) => {
      return new Promise((resolve, reject) => {
        fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
            mutation updateSlideLocation(
              $token: String!
              $slideId: String!
              $location: Int!
            ) {
              updateSlideLocation(token: $token, slideId: $slideId, location: $location) {
                succeeded
                message
              }
            }
          `,
            variables: {
              token: cookies.userAuthToken,
              slideId: slide.id,
              location: slide.slide_location,
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            resolve(data);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    });
    console.log({ allPromises });

    Promise.all(allPromises)
      .then((res2) => {
        refetch();
        toast.success(`slide position updated!`);
        console.log({ res2 });
      })
      .catch((err2) => {
        console.error({ err2 });
      });
  }

  if (loading || error || !data) return <div></div>;

  return (
    <div className={Styles.slidesContainer}>
      <div
        className={clsx(Styles.slidesContainer__leftSides, Styles.scrollbar)}
      >
        <div className={Styles.slidesContainer__leftSides__content}>
          <div
            className={Styles.slidesContainer__leftSides__content__addNewBtn}
          >
            <span
              className={
                Styles.slidesContainer__leftSides__content__addNewBtn__span
              }
            >
              VReel Background Audio
            </span>
            <SlideActionsBtn
              Icon={BsPlus}
              title="Add Slide"
              padding="7px 13px"
              bgColor="#ff7a00"
              color="white"
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="slides">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={Styles.slides}
                >
                  {slideData?.map((e: any, index: number) => (
                    <Slide
                      title={`Slide ${index + 1}`}
                      initialValues={e}
                      refetch={refetch}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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

          {/* <div>
            {preview ? (
              <PreviewSliders view="Desktop" />
            ) : (
              <PreviewSliders view="Mobile" />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Slides);
