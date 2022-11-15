import { useSlideRefer } from "@hooks/useSlideRefer";
import clsx from "clsx";
import { useFormikContext } from "formik";
import React, { useCallback, useState } from "react";
import FormikControl from "src/services/formik/FormikControl";
import { callToActionsData, SlidesDataType } from "../../../SlidesData";
import Styles from "./CallToActions.module.scss";
import { Field } from "formik"
import MediaSelectorGallery from "@formik/common/Media/MediaSelectorGridItem/MediaSelectorGallery";

const textInputLinkTypes = ["url", "call", "text", "email"]

function DocumentSelector({ name }: { name: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext();

  function set_item(item) {
    const { uri } = item;
    setFieldValue(`${name}.link_url`, uri);
  }
  function handleOpen(e) {
    // alert("setting")
    e.preventDefault();
    setOpen(true);
  }
  return (
    <div>
      <button style={{ backgroundColor: "white", width: "100px", height: "50px" }} onClick={() => setOpen(true)}>Select Doc</button>
      {open && (
        <MediaSelectorGallery
          open={open}
          setOpen={setOpen}
          setItem={set_item}
          file_type="docs"
        />
      )}
    </div>
  )
}

const CallToActions = ({ name, link_type }) => {
  const [type, settype] = useState(callToActionsData[0].title);
  const { setFieldValue, handleChange, values } = useFormikContext();

  const handleActive = useCallback(
    (index: number, title) => {
      settype(title);
      setFieldValue(`${name}.link_type`, title);
    },
    [link_type]
  );
  const { getSlidesData } = useSlideRefer();
  const { sectionsData, username, slidesContent, employees } = getSlidesData();
  return (
    <div className={Styles.callToActionsContainer}>
      <FormikControl
        name={`${name}.link_header`}
        control="input"
        placeholder="Link Header"
        type="text"
        slideinput={true}
      />
      <div className={Styles.callToActionsContainer__btnGrid}>
        {callToActionsData.map((item: SlidesDataType, index: number) => (
          <div
            key={index}
            className={clsx(
              link_type === item.title ? Styles.active : Styles.deactive
            )}
            onClick={() => handleActive(index, item.title)}
          >
            <img src={item.src} alt="Call element Icon" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      {/* ----------------------------- Select Tag -----------------------*/}
      {
        (() => {
          switch (link_type.toLowerCase()) {
            case "slide":
              console.log("name =>", name)
              return (
                <Field as="select"
                  name={`${name}.link_url`}
                >
                  {slidesContent.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.title.header}
                    </option>)
                  )}
                </Field>
              )
            case "employee":
              return (
                <Field as="select"
                  name={`${name}.link_url`}
                >
                  {employees.map(({ first_name, last_name, id }, index) => (
                    <option key={index} value={id}>
                      {`${first_name} ${last_name}`}
                    </option>
                  ))}
                </Field>
              )
            case "sections":
              return (
                <Field as="select"
                  name={`${name}.link_url`}
                >
                  {sectionsData.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Field>)

            case "document":
              return (
                <DocumentSelector name={name} />
              )
          }
        })()
      }


      {/* ----------------------------- Group Elemsnts Option-----------------------*/}
      {/* {
        link_type?.toLowerCase() === "document" &&
        <FormikControl
          name={`${name}.link_url`}
          control="input"
          placeholder={type}
          onChange={handleChange}
          type="text"
          slideinput={true}
        />
      }
      {
        textInputLinkTypes.includes(link_type?.toLowerCase()) &&

        <FormikControl
          name={`${name}.link_url`}
          control="input"
          placeholder={type}
          onChange={handleChange}
          type="text"
          slideinput={true}
        />

      } */}

    </div >
  );
};

export default CallToActions;
