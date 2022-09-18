import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import * as AiIcons from "react-icons/ai";
import Styles from "../DisplayOptions.module.scss";
import { displayData } from "./displayData";

import {
  removeFromParent,
  setParent,
} from "@redux/createSlice/createHeightSlice";
import { RootState } from "@redux/store/store";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DISPLAY_OPTIONS } from "@graphql/query";
import { useCookies } from "react-cookie";
import { UPDATE_VREEL_FIELDS } from "@graphql/mutations";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";

const DisplaySettingsKeys = [
  "display_options/default_logo",
  "display_options/background_audio",
]

const DisplayOption: React.FC = () => {
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const { data, error } = useQuery(GET_DISPLAY_OPTIONS, { variables: { token: cookies.userAuthToken } })
  const [updateDisplayOptions] = useMutation(UPDATE_VREEL_FIELDS);
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const [displayContent, setDisplayContent] = useState<any>();
  const dispatch = useDispatch();
  const [currentVals, setCurrentVals] = useState<any>({});
  const [currentParent, setCurrentParent] = useState<{
    index: number;
    height: number;
    title: string;
  } | null>(null);
  const isLarge = useMediaQuery({ query: "(min-width: 1020px)" });

  useEffect(() => {
    console.log("current vals", currentVals)
  }, [currentVals])

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
    if (data) {
      setDisplayContent(data.getUserByToken.vreel.display_options);
      setCurrentVals(data.getUserByToken.vreel.display_options);
    }
  }, [data, error])

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
    const fields = []
    for (const [key, value] of Object.entries(currentVals)) {
      const field = `display_options/${key}`
      if (DisplaySettingsKeys.includes(field)) {
        fields.push({
          field,
          value
        })
      }
    };
    console.log("updating fields", fields)
    updateDisplayOptions({
      variables: {
        token: cookies.userAuthToken,
        fields
      }
    })
      .then(() => alert("updated"))
      .catch((err) => alert(err.message))
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
      {displayContent &&
        <FormikContainer initialValues={displayContent}>
          {(formik) => {
            setCurrentVals(formik.values)
            return (
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
                      <FormikControl
                        control="input"
                        type="text"
                        name="background_audio"
                        placeholder="Background Audio"
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
                          src={currentVals?.default_logo}
                          alt="Picture of a Lady"
                        />
                        <FormikControl control="media-image" name="default_logo" />
                      </div>

                      {/* <ToggleButton /> */}
                    </div>

                  </div>
                  <FActionsBtn
                    title="Update Display Options"
                    padding="7px 13px"
                    bgColor="green"
                    color="white"
                    actions={handleSubmit}
                  />
                </div>
              </form>
            )
          }}
        </FormikContainer>
      }

    </div>
  );
};

export default DisplayOption;
