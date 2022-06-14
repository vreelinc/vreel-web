import React from "react";
import Styles from "./BottomSheetBtnBottom.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import { gql, useQuery } from "@apollo/client";
const GET_LINKS = gql`
  query User($Username: String) {
    username(username: $Username) {
      username
      vreel {
        author
        elements {
          socials {
            platform
            username
          }
        }
      }
    }
  }
`;
const BottomSheetButton: React.FC<{
  setOpen: Function;
  title: string;
}> = ({ setOpen, title }) => {
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: "hasan",
    },
  });
  console.log({ data: data?.username.vreel.elements.socials });

  return (
    <div className={Styles.buttonContainer} onClick={() => setOpen(true)}>
      <p>{title}</p>
      <button></button>
    </div>
  );
};

export default BottomSheetButton;
