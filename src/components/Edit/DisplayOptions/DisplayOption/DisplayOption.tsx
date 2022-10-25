import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import * as AiIcons from "react-icons/ai";
import Styles from "../DisplayOptions.module.scss";
import { displayData } from "./displayData";
import { Field } from "formik";
import {
  removeFromParent,
  setParent,
} from "@redux/createSlice/createHeightSlice";
import { RootState } from "@redux/store/store";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_DISPLAY_OPTIONS,
  GET_DISPLAY_OPTIONS_BY_PAGE,
} from "@graphql/query";
import { useCookies } from "react-cookie";
import { UPDATE_VREEL_FIELDS } from "@graphql/mutations";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { FontSelector } from "@shared/InputForm/InputForm";
import useDebounce from "@hooks/useDebounce";
import { ObjectisEqual } from "src/utils/check";
const DisplaySettingsKeys = [
  "display_options/background_audio",
  "display_options/default_logo",
  "display_options/slides/title/family",
  "display_options/slides/title/uri",
  "display_options/slides/button/uri",
  "display_options/slides/button/family",
  "display_options/slides/description/family",
  "display_options/slides/description/uri",
  "display_options/sections/title/family",
  "display_options/sections/title/uri",
  "display_options/sections/button/uri",
  "display_options/sections/button/family",
  "display_options/sections/description/family",
  "display_options/sections/description/uri",
  "display_options/sections/header/family",
  "display_options/sections/header/uri",
];

const DisplayOption: React.FC = () => {
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const { currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  const { data, error, refetch } = useQuery(GET_DISPLAY_OPTIONS_BY_PAGE, {
    variables: { id: currentPageId },
  });
  const [updateDisplayOptions] = useMutation(UPDATE_VREEL_FIELDS);
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const [displayContent, setDisplayContent] = useState<any>();
  const dispatch = useDispatch();
  const [currentVals, setCurrentVals] = useState<any>({});
  const [editedFontsStack, setFontsStack] = useState([]);

  const [currentParent, setCurrentParent] = useState<{
    index: number;
    height: number;
    title: string;
  } | null>(null);
  const didMountRef = useRef(false);
  const isLarge = useMediaQuery({ query: "(min-width: 1020px)" });
  const refetchValues = useDebounce(currentVals, 2000);
  const fontsDebounceValue = useDebounce(editedFontsStack);
  useEffect(() => {
    const fields = [];
    fontsDebounceValue.forEach(({ key, uri, label }) => {
      fields.push({
        field: `display_options/${key}/uri`,
        value: uri,
      });

      fields.push({
        field: `display_options/${key}/family`,
        value: label,
      });
    });
    for (const [key, value] of Object.entries(currentVals)) {
      const field = `display_options/${key}`;
      if (DisplaySettingsKeys.includes(field)) {
        fields.push({
          field,
          value,
        });
      }
    }

    updateDisplayOptions({
      variables: {
        token: cookies.userAuthToken,
        vreelId: currentPageId,
        fields,
      },
    }).catch((err) => alert(err.message));
  }, [fontsDebounceValue, refetchValues]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
    if (data) {
      setDisplayContent(data.page.display_options);
      setCurrentVals(data.page.display_options);
    }
  }, [data, error]);

  useEffect(() => {
    setDisplayContent(null);
    if (didMountRef.current === true) {
      refetch({
        id: currentPageId,
      })
        .then(({ data }) => {
          setDisplayContent(data.page.display_options);
          setCurrentVals(data.page.display_options);
        })
        .catch((err) => alert(err.message));
    }
    didMountRef.current = true;
  }, [currentPageId]);

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

  function handleSetFont({ uri, label, key }) {
    setFontsStack((prev) => [...prev, { key, uri, label }]);
  }

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
      {displayContent && (
        <FormikContainer initialValues={displayContent}>
          {(formik) => {
            console.log("formik  valls", formik.values);
            setCurrentVals(formik.values);
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // handleSubmit(formik.values);
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
                      <div>
                        <section>
                          <h5 style={{ color: "white" }}>Slide Title Font</h5>
                        </section>
                        <FontSelector
                          placeholder={displayContent.slide?.title.family}
                          setFont={({ label, value }) =>
                            handleSetFont({
                              uri: value,
                              label,
                              key: "slides/title",
                            })
                          }
                        />
                      </div>
                      <div>
                        <section>
                          <h5 style={{ color: "white" }}>
                            Slide Description Font
                          </h5>
                        </section>
                        <FontSelector
                          placeholder={displayContent.slide?.description.family}
                          setFont={({ label, value }) =>
                            handleSetFont({
                              uri: value,
                              label,
                              key: "slides/description",
                            })
                          }
                        />
                      </div>
                      <div>
                        <section>
                          <h5 style={{ color: "white" }}>Slide Button Font</h5>
                        </section>
                        <FontSelector
                          placeholder={displayContent.slide?.button.family}
                          setFont={({ label, value }) =>
                            handleSetFont({
                              uri: value,
                              label,
                              key: "slides/button",
                            })
                          }
                        />
                      </div>
                      <div></div>
                    </div>
                    <div className={Styles.title}>Sections</div>
                    <div>
                      <div className={Styles.displayDataWrapper}>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Section Header Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={displayContent.sections?.header.family}
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/header",
                              })
                            }
                          />
                        </div>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Sections Title Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={displayContent.sections?.title.family}
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/title",
                              })
                            }
                          />
                        </div>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Sections Description Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={
                              displayContent.sections?.description.family
                            }
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/description",
                              })
                            }
                          />
                        </div>
                        <div>
                          <section>
                            <h5 style={{ color: "white" }}>
                              Sections Button Font
                            </h5>
                          </section>
                          <FontSelector
                            placeholder={displayContent.sections?.button.family}
                            setFont={({ label, value }) =>
                              handleSetFont({
                                uri: value,
                                label,
                                key: "sections/button",
                              })
                            }
                          />
                        </div>
                      </div>
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
                      <Field
                        as="select"
                        name="advanced.background_audio_source"
                      >
                        <option value={"audio"}>Source Audio File</option>
                        <option value={"icecast"}>Icecast</option>
                        <option value={"mp3"}>Mp3</option>
                      </Field>
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
                        <FormikControl
                          control="media-image"
                          name="default_logo"
                        />
                      </div>

                      {/* <ToggleButton /> */}
                    </div>
                  </div>
                  <FActionsBtn
                    title="Update Display Options"
                    padding="7px 13px"
                    bgColor="green"
                    color="white"
                    // actions={handleSubmit}
                  />
                </div>
              </form>
            );
          }}
        </FormikContainer>
      )}
    </div>
  );
};

export default DisplayOption;
