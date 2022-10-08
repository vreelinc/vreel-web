import { socials } from "./socialsData";
import Styles from "../Children.module.scss";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SOCIALS_LINK, DELETE_SOCIALS_ELEMENT, EDIT_ELEMENT_HEADER, EDIT_SOCIALS_LINK, REMOVE_SOCIALS_LINK } from "@edit/Elements/schema";
import { useCookies } from "react-cookie";
import { useFormikContext } from "formik";
import { UPDATE_ELEMENT_BACKGROUND_COLOR } from "@graphql/mutations";

interface Props {
  social: any,
  refetch: () => void
}

const Socials: React.FC<Props> = ({ social, refetch }) => {
  const [selectSocialsActive, setSelectSocialsActive] = useState<boolean>(false);
  const [addSocialsLink] = useMutation(CREATE_SOCIALS_LINK);
  const [removeSocialsLink] = useMutation(REMOVE_SOCIALS_LINK);
  const [deleteElement] = useMutation(DELETE_SOCIALS_ELEMENT);
  const [editSocialsLink] = useMutation(EDIT_SOCIALS_LINK);
  const [editElementHeader] = useMutation(EDIT_ELEMENT_HEADER);
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [editedStack, setEditedStack] = useState<Set<{ id: string, username: string }>>(new Set([]));
  const [currentVals, setCurrentVals] = useState(social);
  const [socialsList, setSocialsList] = useState([]);
  const [updateBackgroundColor] = useMutation(UPDATE_ELEMENT_BACKGROUND_COLOR);
  const initialValues = {
    element__header: "",
    background: "#b3bac3",
    font: "#b3bac3",
  };

  useEffect(() => {
    social.socials.forEach((social => {
      setSocialsList(prev => ({ ...prev, [social.id]: { username: social.username } }))
    }))
  }, [])

  const handleSubmit = async (values) => {

    updateBackgroundColor({
      variables: {
        token: cookies.userAuthToken,
        elementType: "socials_element",
        elementId: social.id,
        backgroundColor: currentVals.background_color
      }
    }).then((resp) => {
    })
      .catch((err) => alert(err.message))
    if (social.header !== currentVals.header) {
      alert('refreshing header!')
      editElementHeader({
        variables: {
          token: cookies.userAuthToken,
          elementId: social.id,
          elementType: "socials",
          header: currentVals.header
        }
      })
    }
    for (const link of editedStack) {
      editSocialsLink({
        variables: {
          token: cookies.userAuthToken,
          linkId: link.id,
          input: {
            username: link.username
          }
        }
      })
    }
  };


  function updateSocialsList(id: string, username: string) {
    setSocialsList(prev => ({ ...prev, [id]: { username } }))
  }

  function addLink(title: string) {
    addSocialsLink({
      variables: {
        token: cookies.userAuthToken,
        elementId: social.id,
        link: {
          position: 0,
          platform: title,
          username: ""
        }
      }
    }).then((res) => {
      refetch();
    })
  };

  function removeLink(socialsId: string) {
    removeSocialsLink({
      variables: {
        token: cookies.userAuthToken,
        socialsId
      }
    }).then((res) => { })
  }

  function handleDeleteElement() {
    alert(social.id)
    deleteElement({
      variables: {
        token: cookies.userAuthToken,
        elementId: social.id
      }
    })
  }


  function appendToStack(data: { id: string, username: string }) {
    setEditedStack(prev => {
      const temp = prev;
      temp.forEach((link) => {
        if (link.id === data.id) {
          temp.delete(link);
        }
      })
      return new Set([...temp, data])
    })
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
      <FormikContainer initialValues={social}>
        {(formik) => {
          setCurrentVals(formik.values)
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
                name="header"
                placeholder="Element Header"
                required={true}
                elementInput={true}
              />
              <div style={{ padding: "1rem" }}>
                <FormikControl
                  control="input"
                  type="text"
                  name="background_color"
                  placeholder="Background Color"
                  required={true}
                  elementInput={true}
                  icon={false}
                />
              </div>

              <div>
                {social?.socials.map((social, index) => {
                  const s = socials.find(_social => social.platform === _social.title);
                  let i = index >= 0 ? index : social["socials"].length - 1;
                  return (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <FormikControl
                        key={index}
                        control="input"
                        type="text"
                        value={socialsList[social.id]?.username}
                        name={`socials`}
                        onChange={(e) => {
                          updateSocialsList(social.id, e.target.value)
                          appendToStack({ id: social.id, username: e.target.value })
                        }}
                        placeholder="Username"
                        required={true}
                        social={{ logo: s?.logo, title: s?.title }}
                      />
                      <section style={{ paddingTop: "20px" }}>
                        <FActionsBtn
                          width="4pc"
                          title="Remove"
                          padding="5px 13px"
                          bgColor="red"
                          color="white"

                          actions={() => {
                            removeLink(social.id)
                          }}
                        />
                      </section>
                    </div>
                  )

                })
                }
              </div>

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
              <div className={Styles.elements__left}>
                <FActionsBtn
                  title="Delete Section"
                  padding="7px 13px"
                  bgColor="#11b03e"
                  color="white"
                  actions={handleDeleteElement}
                />
                <FActionsBtn
                  title="Save Section"
                  padding="7px 13px"
                  bgColor="#11b03e"
                  color="white"
                  actions={handleSubmit}
                />
              </div>
            </form>
          );
        }}

      </FormikContainer>
    </div>
  );
};

export default Socials;
