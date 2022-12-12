import { gql, useMutation } from "@apollo/client";
import { APPEND_SLIDE_TO_GALLERY, DELETE_GALLERY_ELEMENT, EDIT_ELEMENT_HEADER } from "@edit/Elements/schema";
import Slide from "@edit/Slides/Slides/Slide/Slide"
import FormikControl from "@formik/FormikControl";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import dynamic from "next/dynamic";
import Styles from "../../../Elements.module.scss";
import Styles2 from "../Children.module.scss";
import clsx from "clsx";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import SlideRequests from "@edit/Slides/Slides/Slide/Collaborator/requests";

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
export default function GalleryEditor({ token, data, refetch, collab_slides }) {
    const [cookies, setCookie] = useCookies(["userAuthToken"]);
    const [createSlide] = useMutation(APPEND_SLIDE_TO_GALLERY);
    const [updateSlideLocation] = useMutation(SLIDE_UPDATE_LOCATION);
    const [removeGallerySection] = useMutation(DELETE_GALLERY_ELEMENT);
    const [updateHeader,] = useMutation(EDIT_ELEMENT_HEADER);
    const [header, setHeader] = useState<string>(data.header);
    const [collabSlides, setCollabSlides] = useState(collab_slides)
    const [slides, setSlides] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true)
    useEffect(() => {
        if (data) {
            if (data?.slides) {
                const orderedSlides = data.slides.sort((a: any, b: any) => {
                    return a.slide_location - b.slide_location;
                });

                setSlides(orderedSlides)
            }
        }
    }, [data]);


    const DragDropContext = dynamic(
        () =>
            import("react-beautiful-dnd").then((mod) => {
                return mod.DragDropContext;
            }),
        { ssr: false }
    );
    const Droppable = dynamic(
        () =>
            import("react-beautiful-dnd").then((mod) => {
                return mod.Droppable;
            }),
        { ssr: false }
    );
    const Draggable = dynamic(
        () =>
            import("react-beautiful-dnd").then((mod) => {
                return mod.Draggable;
            }),
        { ssr: false }
    );

    function handleSubmit() {
        alert()
    }

    function handleDrag(e) {
        const temp = arraymove(slides, e.source?.index, e.destination?.index);
        setSlides(temp);

        // alert('updating affected')
        slides.forEach((slide, idx) => {
            updateSlideLocation({
                variables: {
                    token: cookies.userAuthToken,
                    slideId: slide.id,
                    location: idx + 1
                }
            })
        })

    }


    return (
        <div >
            <div className={Styles2.children}>
                <div className={Styles2.children__input}>
                    <div className={Styles2.children__inputWrapper}>
                        <input value={header} placeholder="Header" onChange={(e) => setHeader(e.target.value)} />
                    </div>
                </div>

                <FActionsBtn
                    title="+ Add Slide"
                    padding="7px 13px"
                    bgColor="#ff7a00"
                    color="white"
                    actions={() => {
                        createSlide({
                            variables: {
                                token: cookies.userAuthToken,
                                elementId: data.id
                            }
                        }).then(() => {
                            alert("added successfully");
                            refetch()
                        })
                            .catch((err) => alert(err.message))
                    }}
                />

            </div>
            <div>
                <SlideRequests
                    context={{ isSection: true, collectionId: data.id }}
                    refetch={refetch}
                    slides={collabSlides}
                />
            </div>

            {
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId="array-10">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <div className={Styles.element_container} style={{ margin: "2rem 0" }}>
                                    {slides.map((slide, index) => (
                                        <Draggable
                                            key={`${slide.title} ${index}`}
                                            draggableId={slide.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    key={index}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        boxShadow: snapshot.isDragging
                                                            ? "0 0 .4rem #666"
                                                            : "none",
                                                    }}
                                                    className={clsx(Styles.dragWrapper)}
                                                >
                                                    {/* <span {...provided.dragHandleProps}>Hello</span> */}

                                                    <Slide
                                                        initialValues={slide}
                                                        index={index}
                                                        title={"Slide " + (index + 1)}
                                                        refetch={refetch}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            }
            <div className={Styles2.children__btnContainer}>
                <FActionsBtn
                    title="Delete"
                    bgColor="hsl(349, 91%, 50%)"
                    padding="8px 23px"
                    borderRadius="8px"
                    color="white"
                    actions={() => {
                        removeGallerySection({
                            variables: {
                                token: cookies.userAuthToken,
                                elementId: data.id
                            }
                        }).then(() => alert("removed"))
                            .catch((err) => alert(err.message))
                    }}
                // type="submit"
                />
                <FActionsBtn
                    title="Save"
                    bgColor="hsl(137, 82%, 38%)"
                    padding="8px 23px"
                    borderRadius="8px"
                    color="white"
                    actions={() => {
                        if (data.header !== header) {
                            updateHeader({
                                variables: {
                                    token: cookies.userAuthToken,
                                    elementId: data.id,
                                    elementType: "gallery",
                                    header: header
                                }
                            })
                                .then(() => alert("updated!"))
                                .catch(() => alert("failed to update header"))
                        }
                    }}
                // type="submit"
                />
                {/*<FActionsBtn*/}
                {/*    title="Remove Element"*/}
                {/*    padding="7px 13px"*/}
                {/*    bgColor="red"*/}
                {/*    color="white"*/}
                {/*    actions={() => {*/}
                {/*        removeGallerySection({*/}
                {/*            variables: {*/}
                {/*                token: cookies.userAuthToken,*/}
                {/*                elementId: data.id*/}
                {/*            }*/}
                {/*        }).then(() => alert("removed"))*/}
                {/*            .catch((err) => alert(err.message))*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<FActionsBtn*/}
                {/*    title="Save Changes"*/}
                {/*    padding="7px 13px"*/}
                {/*    bgColor="blue"*/}
                {/*    color="white"*/}
                {/*    actions={() => {*/}
                {/*        if (data.header !== header) {*/}
                {/*            updateHeader({*/}
                {/*                variables: {*/}
                {/*                    token: cookies.userAuthToken,*/}
                {/*                    elementId: data.id,*/}
                {/*                    elementType: "gallery",*/}
                {/*                    header: header*/}
                {/*                }*/}
                {/*            })*/}
                {/*                .then(() => alert("updated!"))*/}
                {/*                .catch(() => alert("failed to update header"))*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        </div>
    )
}