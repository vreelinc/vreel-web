import { useMutation } from "@apollo/client";
import { APPEND_SLIDE_TO_GALLERY, DELETE_GALLERY_ELEMENT, EDIT_ELEMENT_HEADER } from "@edit/Elements/schema";
import Slide from "@edit/Slides/Slides/Slide/Slide"
import FormikControl from "@formik/FormikControl";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import React, { useState } from "react"
import { useCookies } from "react-cookie";

export default function GalleryEditor({ token, data, refetch }) {
    const [cookies, setCookie] = useCookies(["userAuthToken"]);
    const [createSlide] = useMutation(APPEND_SLIDE_TO_GALLERY);
    const [removeGallerySection] = useMutation(DELETE_GALLERY_ELEMENT);
    const [updateHeader] = useMutation(EDIT_ELEMENT_HEADER);
    const [header, setHeader] = useState<string>(data.header);

    function handleSubmit() {
        alert()
    }
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
                data?.slides.map((slide, idx) => (
                    <Slide
                        index={idx}
                        initialValues={slide}
                        title={slide.title.title}
                        refetch={() => { }}
                    />
                ))
            }
        </div>
    )
}