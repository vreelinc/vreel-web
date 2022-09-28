import { gql, useMutation } from "@apollo/client";
import { APPEND_SLIDE_TO_GALLERY, DELETE_GALLERY_ELEMENT, EDIT_ELEMENT_HEADER } from "@edit/Elements/schema";
import Slide from "@edit/Slides/Slides/Slide/Slide"
import FormikControl from "@formik/FormikControl";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import dynamic from "next/dynamic";
import Styles from "../../../Elements.module.scss";
import clsx from "clsx";

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
export default function GalleryEditor({ token, data, refetch }) {
    const [cookies, setCookie] = useCookies(["userAuthToken"]);
    const [createSlide] = useMutation(APPEND_SLIDE_TO_GALLERY);
    const [updateSlideLocation] = useMutation(SLIDE_UPDATE_LOCATION);
    const [removeGallerySection] = useMutation(DELETE_GALLERY_ELEMENT);
    const [updateHeader,] = useMutation(EDIT_ELEMENT_HEADER);
    const [header, setHeader] = useState<string>(data.header);
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


    console.log("ordered slides locations map ", slides.map(({ slide_location }, idx) => slide_location))
    function handleSubmit() {
        alert()
    }

    function handleDrag(e) {
        console.log("drop", e)
        const temp = arraymove(slides, e.source?.index, e.destination?.index);
        setSlides(temp);

        console.log("temp", temp)
        console.log("drag data event ->", data)
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

    console.log(slides.map((slide) => slide.id))

    console.log("data", data)
    return (
        <div >
            <div>
                <FActionsBtn
                    title="Add New Slide"
                    padding="7px 13px"
                    bgColor="#11b03e"
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
                <FActionsBtn
                    title="Remove Element"
                    padding="7px 13px"
                    bgColor="red"
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
                />
            </div>
            <div>
                <input value={header} placeholder="Header" onChange={(e) => setHeader(e.target.value)} />
                <FActionsBtn
                    title="Save Changes"
                    padding="7px 13px"
                    bgColor="blue"
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
                />
            </div>
            {
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId="array-10">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <div className={Styles.element_container}>
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
                                                        title
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
        </div>
    )
}