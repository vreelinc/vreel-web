import React, { useCallback, useEffect, useRef, useState } from "react";
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

const SLIDE_UPDATE = gql`
  mutation deleteSlide($token: String!, $slideId: String!, $location: Int!) {
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
  const [slideUpdate] = useMutation(SLIDE_UPDATE);

  const { loading, error, data, refetch } = useQuery(GET_SLIDES, {
    variables: {
      token: cookies.userAuthToken,
    },
  });

  // const { loading, error, data, refetch } = useQuery(SLIDE_UPDATE, {
  //   variables: {
  //     token: cookies.userAuthToken,
  //     slideId:,
  //     location:
  //   },
  // });

  const handleCollapse = (index: number) => {
    if (active === index) return;
    setActive(index);
  };
  const handleActive = useCallback((index) => handleCollapse(index), [active]);

  const slideData = data?.getUserByToken?.vreel?.slides
    .map((item: any) => item)
    .sort((a: any, b: any) => {
      return a.slide_location - b.slide_location;
    });

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return null;

    let slideItem = [...slideData];

    const [sliceData] = slideItem.splice(result.source.index, 1);
    slideItem.splice(result.destination.index, 0, sliceData);
    slideItem = slideItem.filter((item) => item?.id !== undefined);

    // slideUpdate({
    //   variables: {
    //     token: cookies.userAuthToken,
    //     slideId: result.draggableId,
    //     location: result.source.index,
    //   },
    // })
    //   .then((res) => {
    //     refetch();
    //     toast.success(`${result.source.droppableId} updated!`);
    //     console.log({ res });
    //   })
    //   .catch((err) => {
    //     toast.error("This didn't work.");
    //     console.log(err);
    //   });
    console.log(result, slideItem);
  }
  console.log(slideData);

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
                    <Draggable key={index} draggableId={e.id} index={index + 1}>
                      {(provided, snapShot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Slide
                            title={`Slides ${index + 1}`}
                            initialValues={e}
                            refetch={refetch}
                            index={index}
                            active={active}
                            handleActive={handleActive}
                            handleDrag={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
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
