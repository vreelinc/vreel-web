import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { elements } from "./ElementsData";
import Styles from "./Elements.module.scss";
import Element from "./Element/Element";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import clsx from "clsx";
import { RootState } from "@redux/store/store";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SLINK_SECTION, GET_SECTIONS, REMOVE_SLIDE } from "./schema";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GET_USER_BY_TOKEN } from "@graphql/query";
import { useCookies } from "react-cookie";
import SimpleLink from "./Element/childrens/SimpleLink/SimpleLink";

export const callToActionsData = [
  {
    id: 1,
    title: "Links",
    src: "/assets/calltoaction/global-line.svg",
  },
  {
    id: 2,
    title: "Image",
    src: "/assets/icons/image.svg",
  },
  {
    id: 3,
    title: "Text",
    src: "/assets/calltoaction/text.svg",
  },
  {
    id: 4,
    title: "Email",
    src: "/assets/calltoaction/mail.svg",
  },
  {
    id: 5,
    title: "Sections",
    src: "/assets/calltoaction/stack-line.svg",
  },
  {
    id: 6,
    title: "Videos",
    src: "/assets/calltoaction/slide.svg",
  },
  {
    id: 7,
    title: "Contact",
    src: "/assets/calltoaction/contact.svg",
  },
  {
    id: 8,
    title: "Event",
    src: "/assets/calltoaction/event.svg",
  },
  {
    id: 9,
    title: "Socials",
    src: "/assets/calltoaction/Group.svg",
  },
  {
    id: 10,
    title: "Products",
    src: "/assets/calltoaction/cart.svg",
  },
];

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

const Elements = () => {
  const [cookies, setCookie] = useCookies();
  const { loading, error, data, refetch } = useQuery(GET_USER_BY_TOKEN, {
    variables: {
      token: cookies.userAuthToken,
    },
  });

  const inactiveElements = elements.filter((ele) => ele.active === false);
  const ref = useRef(null);

  // useEffect(() => {

  //   const observer = new IntersectionObserver((entries) => {
  //     console.log("entries",entries);
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.remove(`${Styles.hide}`);
  //         entry.target.classList.add(`${Styles.show}`);

  //         console.log("Entry", entry.target);
  //       } else {
  //         entry.target.classList.remove(`${Styles.show}`);
  //         entry.target.classList.add(`${Styles.hide}`);
  //       }
  //     });
  //   },{threshold:0.5});
  //   if (ref.current) {
  //     ref.current.childNodes.forEach((item) => {
  //       observer.observe(item);
  //     });
  //   }

  // }, [ref]);

  const [createSLinksSection] = useMutation(CREATE_SLINK_SECTION);
  const [removeSlide] = useMutation(REMOVE_SLIDE);
  const {
    expandMenu,
    userAuth: {
      user: { vreel, token },
    },
  } = useSelector((state) => state);
  const [selectedType, setSelectedType] = useState("Links");
  const [array1, updateArray1] = useState(activeElements);
  const [array2, updateArray2] = useState(inactiveElements);

  function handleOnDragEnd1(result) {
    if (!result.destination) {
      return null;
    }
    const items = Array.from(array1);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateArray1(items);
  }

  function handleOnDragEnd2(result) {
    if (!result.destination) return;
    const items = Array.from(array2);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateArray2(items);
  }
  function handleNewSectionCreate() {
    switch (selectedType) {
      case "Links":
        createSLinksSection({
          variables: {
            token: token,
            vreelId: vreel.id,
          },
        })
          .then((res) => {
            toast.success(`New section added!`);
            refetch();
            console.log({ res });
          })
          .catch((err) => {
            toast.error(err.message);
            console.log({ err });
          });
        break;

      default:
        break;
    }
  }
  if (loading || error || !data) {
    return <div>Loading...</div>;
  }
  const { simple_links, socials, video_gallery, gallery } =
    data.getUserByToken.vreel;
  console.log({ simple_links });
  elements.length = 0;
  simple_links.forEach((e, index) => {
    elements.push({
      ...e,
      title: e.header,
      active: e.hidden,

      component: <SimpleLink data={{ ...e, refetch }} />,
    });
  });
  const activeElements = elements.filter((ele) => ele.active === true);
  return (
    <div className={Styles.elements}>
      {/* LEFT PREVIEW */}
      <div className={Styles.elements__left}>
        <FActionsBtn
          title="Add New Section"
          padding="7px 13px"
          bgColor="#11b03e"
          color="white"
          actions={() => {}}
        />
        <div className={Styles.btnGrid}>
          {callToActionsData.map((item, index) => (
            <div
              key={index}
              className={clsx(
                selectedType === item.title ? Styles.active : Styles.deactive
              )}
              onClick={() => setSelectedType(item.title)}
            >
              <img src={item.src} alt="Type Section Icon" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <FActionsBtn
          title={`Create ${selectedType} Section`}
          padding="7px 13px"
          bgColor="#11b03e"
          color="white"
          actions={handleNewSectionCreate}
        />
        {/* ACTIVE ELEMENTS */}
        <div className={Styles.title}>Sections</div>
        {
          <DragDropContext onDragEnd={handleOnDragEnd1}>
            <Droppable droppableId="array-1">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className={Styles.element_container}>
                    {elements.map((element, index) => (
                      <Draggable
                        key={element.title}
                        draggableId={element.title}
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

                            <Element
                              element={element}
                              handleDrag={provided.dragHandleProps}
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
        {/* INACTIVE ELEMENTS */}

        {/* <div className={Styles.title}>Inactive Elements</div>
        <span className={Styles.sub_title}>Toggle To Activate Element</span>
        <DragDropContext onDragEnd={handleOnDragEnd2}>
          <Droppable droppableId='array-1'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className={Styles.element_container} >
                  {array2.map((element, index) => (
                    <Draggable
                      key={element.title}
                      draggableId={element.title}
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
                              ? '0 0 .4rem #666'
                              : 'none',
                          }}
                          className={Styles.dragWrapper}
                        >
                          <Element
                              element={element}
                              handleDrag={provided.dragHandleProps}
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
        </DragDropContext> */}
      </div>

      {/* RIGHT PREVIEW */}
      <div className={Styles.elements__right}>
        <h1>Preview</h1>
      </div>
    </div>
  );
};

export default Elements;
