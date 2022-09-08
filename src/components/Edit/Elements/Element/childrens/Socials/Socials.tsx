import { socials } from "./socialsData";
import Styles from "../Children.module.scss";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SOCIALS_LINK } from "@edit/Elements/schema";
import { useCookies } from "react-cookie";

interface Props {
  id: string,
  refetch: () => void
}

const Socials: React.FC<Props> = ({ id, refetch }) => {
  const [selectSocialsActive, setSelectSocialsActive] = useState<boolean>(false);
  const [addSocialsLink] = useMutation(CREATE_SOCIALS_LINK);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const initialValues = {
    element__header: "",
    background: "#b3bac3",
    font: "#b3bac3",
  };

  const handleSubmit = async (values) => {
    let obj = {
      element__header: "",
      background: "#b3bac3",
      font: "#b3bac3",
      links: [],
    };
    for (let key in values) {
      if (key === "element__header") {
        obj["element__header"] = values[key];
      } else if (key === "background") {
        obj["background"] = values[key];
      } else if (key === "font") {
        obj["font"] = values[key];
      } else {
        obj["links"].push({
          title: key,
          url: values[key],
        });
      }
    }

    console.log(obj);
  };

  function addLink(title: string) {
    console.log({
      token: cookies.userAuthToken,
      elementId: id,
      link: {
        position: 0,
        platform: title,
        username: ""
      }
    })
    addSocialsLink({
      variables: {
        token: cookies.userAuthToken,
        elementId: id,
        link: {
          position: 0,
          platform: title,
          username: "v"
        }
      }
    }).then((res) => console.log(res))
  }

  return (
    <div className={Styles.children} style={{ padding: ".5rem" }}>
      <div className={Styles.elements__left}>
        <FActionsBtn
          title="Add Social"
          padding="7px 13px"
          bgColor="#11b03e"
          color="white"
          actions={() => {
            setSelectSocialsActive(!selectSocialsActive)
          }}
        />
      </div>
      {
        selectSocialsActive &&
        <div >
          {
            socials.map((social) => {
              return (
                <button onClick={() => addLink(social.title)}>
                  <img style={{ padding: "0.5pc" }} src={social.logo} />
                </button>
              )
            })
          }
        </div>
      }
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <FormikControl
                control="input"
                type="text"
                name="element__header"
                placeholder="Element Header"
                required={true}
                elementInput={true}
              />
              {/* 
              <div>
                {socials.map((social, index) => (
                  <FormikControl
                    key={index}
                    control="input"
                    type="text"
                    name={social.title.toLowerCase()}
                    placeholder="Username"
                    required={true}
                    social={{ logo: social.logo, title: social.title }}
                  />
                ))}
              </div> */}

              {/* <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control="input"
                    type="color"
                    name="background"
                    colorInput={true}
                  />
                  <FormikControl
                    control="input"
                    type="color"
                    name="font"
                    colorInput={true}
                  />
                </div>
              </div> */}
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default Socials;
