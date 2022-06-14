import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import * as AiIcons from "react-icons/ai";
import Styles from "../DisplayOptions.module.scss";
import {
  removeFromParent,
  setParent,
} from "src/redux/createSlice/createHeightSlice";
import { displayData } from "./displayData";
import ChildInput from "src/components/Shared/Inputs/ChildInput";
import AddTitleButton from "src/components/Shared/Buttons/AddTitleButton/AddTitleButton";
import ToggleButton from "../Buttons/ToggleButton";
import { useMediaQuery } from "react-responsive";
import { FormikContainer } from "src/components/formik/FormikContainer";
import FormikControl from "src/components/formik/FormikControl";

const DisplayOption: React.FC = () => {
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState<boolean>(false);
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const dispatch = useDispatch();
  const [currentParent, setCurrentParent] = useState<{
    index: number;
    height: number;
    title: string;
  } | null>(null);
  const isLarge = useMediaQuery({ query: "(min-width: 1020px)" });

  const handleSetHeight = () => {
    setCollapse((collapse) => !collapse);
    dispatch(removeFromParent({ index: currentParent?.index }));

    if (height === 0) {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height + wrapperRef.current.offsetHeight,
          title: "Display Options",
        })
      );

      setHeight(wrapperRef.current.offsetHeight);
    } else {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height - wrapperRef.current.offsetHeight,
          title: "Display Options",
        })
      );

      setHeight(0);
    }
  };

  useEffect(() => {
    setCurrentParent(parent.find((obj) => obj.title === "Display Options"));
  }, [handleSetHeight, collapse]);

  const initialValues = {};

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className={Styles.displayOptionWrapper}>
      <div
        onClick={() => {
          setCollapse((collapse) => !collapse);
          handleSetHeight();
        }}
        className={Styles.displayOption}
      >
        <span className={Styles.displayOption__title}>Display Options</span>
        <button>
          {collapse ? (
            <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
          ) : (
            <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
          )}
        </button>
      </div>

      <FormikContainer initialValues={initialValues}>
        {(formik) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formik.values);
            }}
          >
            <div
              style={{
                height: `${isLarge ? "auto" : height + "px"}`,
                overflow: "hidden",
                width: "100%",
                transition: "all 1.5s ease",
              }}
            >
              <div ref={wrapperRef}>
                <div className={Styles.displayDataWrapper}>
                  {displayData.map((obj, index) => (
                    <FormikControl
                      key={index}
                      control="input"
                      type="text"
                      name={obj.name}
                      placeholder={obj.title}
                      required={true}
                      elementInput={true}
                    />
                  ))}
                </div>
                <div className={Styles.title}>Advanced</div>
                <div className={Styles.displayDataWrapper}>
                  <FormikControl
                    control="input"
                    type="text"
                    name="background_color"
                    placeholder="Background Color"
                    required={true}
                    elementInput={true}
                  />

                  <div className={Styles.displayBackgroundAudio}>
                    <span>VReel Background Audio</span>
                    <div className={Styles.buttonWrapper}>
                      <button>Add Track</button>
                      <button>Add Stream</button>
                    </div>
                  </div>

                  <div className={Styles.displayDataImageWrapper}>
                    <img
                      src="/assets/images/female.png"
                      alt="Picture of a Lady"
                    />
                    <AddTitleButton
                      style={{ padding: 0, margin: ".5rem auto" }}
                      title="Add Logo"
                    />
                  </div>

                  {/* <ToggleButton /> */}
                </div>
              </div>
            </div>
          </form>
        )}
      </FormikContainer>
    </div>
  );
};

export default DisplayOption;
