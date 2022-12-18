import React, { useCallback, useEffect, useState } from "react";
import Slide from "./Slide/Slide";
import { BsPlus } from "react-icons/bs";
import Styles from "./Slides.module.scss";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
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
import { GET_PAGE, vreel } from "@graphql/query";
import { RootState, useAppDispatch } from "@redux/store/store";
import { changes } from "@edit/Layout/Mobile/MobileDashboard";
import { useSelector } from "react-redux";
import { client } from "@graphql/index";
import SlideRequests from "@shared/Collaborator/Slides/requests";

const GET_SLIDES = gql`
  query User($token: String!,$metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      ${vreel}
    }
  }
`;
const CREATE_SLIDE = gql`
  mutation CreateSlide($token: String!, $vreelId: String) {
    createSlide(token: $token, vreelId: $vreelId) {
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


function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr
}

const Slides = () => {
  const [preview, setPreview] = useState(false);
  const [active, setActive] = useState(null || Number);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [createSlide] = useMutation(CREATE_SLIDE);
  const [updateSlideLocation] = useMutation(SLIDE_UPDATE_LOCATION);
  const [slideData, setSlideData] = useState([]);
  const [collabSlides, setCollabSlides] = useState();
  const { currentPageId } = useSelector((state: RootState) => state.editorSlice)


  function getSlides() {

    client.query({
      query: GET_PAGE,
      variables: {
        id: currentPageId,
        metadata: {
          presentation: false,
          self: true,
          token: cookies.userAuthToken
        }
      }
    }).then(({ data, errors, error }) => {
      console.log(errors, error)
      const collab_slides = data?.page?.collab_slides;
      setCollabSlides(collab_slides)
      const slides = [...data.page?.slides?.sort((a: any, b: any) => {
        return a.slide_location - b.slide_location;
      })]

      setSlideData(slides)
    })
      .catch(console.log)
  }

  useEffect(() => {
    setSlideData([])
    if (currentPageId) {
      getSlides();
    }
  }, [currentPageId])


  const [slideState, setSlideState] = useState(slideData);
  const UPDATE_SLIDE = gql`
    mutation EditSlide($token: String!, $slideId: String!, $data: String!) {
      updateSlide(token: $token, slideId: $slideId, data: $data) {
        id
      }
    }
  `;
  const [updateSlide] = useMutation(UPDATE_SLIDE);
  const dispatch = useAppDispatch();
  const handleSubmit = async (values) => {
    updateSlide({
      variables: {
        token: cookies.userAuthToken,
        slideId: values.id,
        data: JSON.stringify(values),
      },
    })
      .then((res) => {
        // changes?.slide?.refetch();
        // toast.success(`${values.title.header} updated!`);
      })
      .catch((err) => {
        toast.error(`Operation Failed for ${values.title.header}`);
      });
  };
  function handleDragEnd(e: DropResult) {
    const temp = arraymove(slideData, e.source?.index, e.destination?.index);
    setSlideData(temp);
    // alert('updating affected')
    slideData.forEach((slide, idx) => {
      updateSlideLocation({
        variables: {
          token: cookies.userAuthToken,
          slideId: slide.id,
          location: idx + 1
        }
      })
    })
  }

  if (!slideData) return <div></div>;

  return (
    <div className={Styles.slidesContainer}>
      <div
        className={clsx(Styles.slidesContainer__leftSides, Styles.scrollbar)}
      >
        <div className={Styles.slidesContainer__leftSides__content}>
          <div
            className={Styles.slidesContainer__leftSides__content__addNewBtn}
          >
            {/* <span
              className={
                Styles.slidesContainer__leftSides__content__addNewBtn__span
              }
            >
              <button
                onClick={() => {
                  // changes.slide.refetch();
                  // dispatch(removeAll());
                  for (let slide in changes.slide) {
                    if (slide != "refetch") {
                      handleSubmit(changes.slide[slide]);
                      delete changes.slide[slide];
                    }
                  }
                  // toast.success(
                  //   `${Object.keys(changes.slide).length - 1} slide(s) updated!`
                  // );
                  // if (Object.keys(changes.slide).length - 1)
                  toast.success(`Changes are saved!`);
                  if (changes.slide?.refetch) changes.slide?.refetch();

                  // dispatch(toggleChangesFag());
                  // console.log({ changes });

                  // router.reload();
                }}
                className="btn-save"
              >
                {"Save"}
              </button>
            </span> */}
            {/* <FActionsBtn
              title="Save Changes"
              padding="7px 13px"
              bgColor="#11b03e"
              color="white"
              actions={() => {
                // changes.slide.refetch();
                // dispatch(removeAll());
                for (let slide in changes.slide) {
                  if (slide != "refetch") {
                    if (changes.slide[slide]) {
                      handleSubmit(changes.slide[slide]);
                      // console.log(changes.slide[slide]);

                      delete changes.slide[slide];
                    }
                  }
                }
                // toast.success(
                //   `${Object.keys(changes.slide).length - 1} slide(s) updated!`
                // );
                // if (Object.keys(changes.slide).length - 1)
                toast.success(`Changes are saved!`);
                if (changes.slide?.refetch) changes.slide?.refetch();

                // dispatch(toggleChangesFag());
                // console.log({ changes });

                // router.reload();
              }}
            /> */}

            <FActionsBtn
              Icon={BsPlus}
              title="Add Slide"
              padding="7px 13px"
              bgColor="#ff7a00"
              color="white"
              actions={() => {
                const nextNo = slideData.length + 1;
                createSlide({
                  variables: {
                    token: cookies.userAuthToken,
                    vreelId: currentPageId
                  },
                })
                  .then((res) => {
                    getSlides();
                    toast.success(`New Slide ${nextNo} added!`);
                  })
                  .catch((err) => {
                    toast.error("This didn't work.");
                  });
              }}
            />
          </div>
          <div>
            <SlideRequests
              refetch={getSlides}
              context={{ isSection: false, collectionId: currentPageId }}
              slides={collabSlides}
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
                      isRef={e?.isRef}
                      title={`Slide ${index + 1}`}
                      initialValues={e}
                      refetch={getSlides}
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
            <ToggleButtonPreview on={preview} setOn={setPreview} />
            <p>Toggle For {!preview ? "Desktop" : "Mobile"} View</p>
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
