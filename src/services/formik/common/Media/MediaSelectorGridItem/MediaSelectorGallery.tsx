import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useCookies } from "react-cookie";
import { gql, useQuery } from "@apollo/client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Styles from "./MediaSelectorGallery.module.scss";
import UploadBtn from "@shared/Buttons/UploadBtn/UploadBtn";
import MediaSelectorGridItem from "../MediaSelectorGrallery/MediaSelectorGridItem";
import { Loader } from "@shared/Loader/Loader";
import { Field, Form, Formik, FormikProps } from 'formik';
import Select from 'react-select';

const SCHEMAS = gql`
  query ($token: String!,$metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      files {
        file_count
        files {
          id
          file_name
          file_type
          uri
        }
      }
    }
  }
`;

type FileTypes = "docs" | "images" | "videos" | "audio";

interface Props {
  open: boolean
  setOpen: (b: boolean) => void;
  setItem: (item: any) => void;
  file_type?: FileTypes;
  prefill?: string
}

const MediaSelectorGallery = ({ open, setOpen, setItem, file_type, prefill }: Props) => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [oepnModal, setOepnModal] = useState(false);
  const [files, setFiles] = useState([]);
  const userFiles = useQuery(SCHEMAS, {
    variables: {
      token: cookies.userAuthToken,
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken
      }
    },
  });
  const { loading, error, data: data2, refetch } = userFiles || {};


  useEffect(() => {
    if (data2) {
      const files = data2.getUserByToken?.files.files;
      if (file_type) {
        const filteredFiles = files.filter((file) => {
          let key;

          //set key to look for in file type
          switch (file_type) {
            case "images":
              key = "image";
              break
            case "docs":
              key = "pdf";
              break;
            case "videos":
              key = "video"
              break
            case "audio":
              key = "audio"
            default:
              key = ""
            // return;
          }
          return file.file_type.includes(key)

        })
        setFiles(filteredFiles)
        return
      }
      setFiles(files);

    }
  }, [data2])
  // if (loading || error || !data2) return <div></div>;
  function handleSetItem({ value }) {
    const file = files.find(file => file.uri === value);
    setItem(file);
  }
  console.log("prefill =>", prefill)
  if (file_type === "docs") {
    let file;
    if (prefill) {
      const locatedFile = files.find(file => file.uri === prefill);;
      // if (!locatedFile) return;

      file = { label: locatedFile?.file_name, value: locatedFile?.uri };
      console.log("this is what i found =>", file, "from ", prefill)
    }
    const _files = [{ file_name: "Select A File", file_type: "pdf" }, ...files].filter((file) => file?.file_type?.includes("pdf")).map(file => ({
      value: file.uri,
      label: file.file_name
    }))
    return (
      <Select
        // defaultValue={prefill}
        value={file}
        onChange={handleSetItem}
        options={_files}
      />

    )
  }
  return (
    <div
      className={clsx(
        Styles.mediaMobileContainer,
        open ? Styles.active : Styles.deActive
      )}
    >
      {loading && <Loader />}
      <div className={Styles.mediaMobileContainer__closer}>
        <button
          className={Styles.mediaMobileContainer__closer__btn}
          onClick={() => setOpen(false)}
        >
          <IoIosCloseCircleOutline />
        </button>
      </div>

      <div className={Styles.mediaMobileContainer__content}>
        <p>Select Slide Media Selector</p>
        <UploadBtn setOpenModal={setOepnModal} />
      </div>

      <div className={Styles.mediaMobileContainer__mediaFileContainer}>
        {files.map(
          (item: Object, index: number) => (
            <div key={index}>
              <MediaSelectorGridItem
                item={item}
                setItem={setItem}
                setOpen={setOpen}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MediaSelectorGallery;
