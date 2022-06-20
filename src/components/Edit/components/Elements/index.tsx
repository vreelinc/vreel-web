import { useState } from "react";
import Element from "./Element";
import Styles from "./Elements.module.scss";
import { elements } from "./ElementsData";
import dynamic from "next/dynamic";

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

const Elements: React.FC = () => {
  const activeElements = elements.filter((ele) => ele.active === true);
  const inactiveElements = elements.filter((ele) => ele.active === false);

  const [array1, updateArray1] = useState(activeElements);
  const [array2, updateArray2] = useState(inactiveElements);

  function handleOnDragEnd1(result) {
    if (!result.destination) return;
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

  return (
    <div className={Styles.elements}>
      {/* LEFT PREVIEW */}
      <div className={Styles.elements__left}>
        {/* ACTIVE ELEMENTS */}
        <div className={Styles.title}>Active Elements</div>

        {/*   {<DragDropContext onDragEnd={handleOnDragEnd1}>
          <Droppable droppableId='array-1'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className={Styles.element_container}>
                  {array1.map((element, index) => (
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
                          <span {...provided.dragHandleProps}>Hello</span>

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
        </DragDropContext>} */}

        {/* INACTIVE ELEMENTS */}
        <div className={Styles.title}>Inactive Elements</div>
        <span className={Styles.sub_title}>Toggle To Activate Element</span>
        {/*         <DragDropContext onDragEnd={handleOnDragEnd2}>
          <Droppable droppableId='array-1'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className={Styles.element_container}>
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
                          <span {...provided.dragHandleProps}>Hello</span>

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
