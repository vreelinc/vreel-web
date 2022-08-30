import React, { useState } from "react";
import Styles from "../Children.module.scss";

import LinkCard from "./LinkCard";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import AddTitleButton from "@shared/Buttons/AddTitleButton/AddTitleButton";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import Alert from "@shared/Alert/Alert";
import { APPEND_LINK } from "@edit/Elements/schema";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { useFormikContext } from "formik";
const simpleLinks = {
  header: "",
  position: 0,
  links: [
    {
      id: "cb37jpi23akl6a0h3lu0",
      position: 2,
      thumbnail: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
      link_header: "Elephant",
      url: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
      link_type: "url",
      tag: "elephant",
      __typename: "SimpleLink",
    },
  ],
  __typename: "SimpleLinksElement",
};
const initialValues = {
  element_header: "Simple Link 1",
  id: "cb37jpi23akl6a0h3lu0",
  position: 2,
  thumbnail: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
  link_header: "Elephant",
  url: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
  link_type: "element",
  tag: "elephant",
  __typename: "SimpleLink",
  background: "#b3bac3",
  font: "#b3bac3",
};
const SimpleLink: React.FC<{ data: any }> = ({ data = {} }) => {
  // console.log({ data });
  const [open, setOpen] = useState(false);
  const [appendLink] = useMutation(APPEND_LINK);
  const [cookies, setCookie] = useCookies();
  const [count, setCount] = useState(0);
  // console.log({ count });

  const {
    expandMenu,
    userAuth: {
      user: { vreel, token },
    },
  } = useSelector((state: RootState) => state);

  // const initialValues = {
  //   element_header: '',
  //   background: '#b3bac3',
  //   font: '#b3bac3',
  // };

  const handleSubmit = async () => {
    console.log("Simple Link--", data);
  };
  console.log({ data });

  console.log("Simple Link Rendered...");

  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={data}>
        {(formik) => {
          console.log(formik);
          // if (!count) {
          //   setCount(formik.values.links.lentgh);
          // }

          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className={Styles.children__input}>
                <FormikControl
                  control="input"
                  type="text"
                  name="header"
                  placeholder="Section Header"
                  required={true}
                  elementInput={true}
                  icon={false}
                />
              </div>

              <AddTitleButton
                handler={() => {
                  formik.values.links.push({
                    position: 2,
                    thumbnail: "",
                    url: "aaaa",
                    link_header: "aaa",
                    link_type: "url",
                  });
                  setOpen(true);
                }}
                title="Add Link"
                style={{ margin: "1rem auto" }}
              />
              {open && (
                <Alert
                  yesText="Add"
                  noText="Cancel"
                  yesCallback={() => {
                    console.log("submit data........");
                    // console.log(data.links.length);

                    console.log(formik.values.links);

                    // return;
                    appendLink({
                      variables: {
                        token: token,
                        elementId: data.id,
                        link: formik.values.links[
                          formik.values.links.length - 1
                        ],
                      },
                    })
                      .then((res) => {
                        setOpen(false);
                        toast.success(`Link added!`);
                        data.refetch().then((res) => {
                          console.log({ res });
                        });
                        // setCount(count + 1);
                        console.log({ res });
                      })
                      .catch((err) => {
                        setOpen(false);
                        toast.error(err.message);
                        console.log({ err });
                      });
                  }}
                  noCallback={() => setOpen(false)}
                  open={true}
                  text="Add New Link"
                  children={
                    <LinkCard
                      // index={data.links.length}
                      // data={formik.values.links[formik.values.links.lentgh - 1]}
                      type={initialValues.link_type}
                      isTag={true}
                    />
                  }
                />
              )}
              {data.links.map((e, index) => (
                <LinkCard
                  data={e}
                  index={index}
                  type={initialValues.link_type}
                  isTag={true}
                />
              ))}

              <div className={Styles.children__btnContainer}>
                <FActionsBtn
                  title="Delete"
                  bgColor="hsl(349, 91%, 50%)"
                  padding="8px 23px"
                  borderRadius="8px"
                  actions={() => {}}
                  type="submit"
                />
                <FActionsBtn
                  title="Save"
                  bgColor="hsl(137, 82%, 38%)"
                  padding="8px 23px"
                  borderRadius="8px"
                  actions={() => {}}
                  type="submit"
                />
              </div>

              {/* <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control='input'
                    type='color'
                    name='background'
                    colorInput={true}
                  />
                  <FormikControl
                    control='input'
                    type='color'
                    name='font'
                    colorInput={true}
                  />
                </div>
              </div> */}

              {/* <button className='sb'>Submit</button> */}
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default React.memo(SimpleLink);
