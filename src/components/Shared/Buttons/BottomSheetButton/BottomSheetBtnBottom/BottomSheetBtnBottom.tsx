import React from "react";
import Styles from "./BottomSheetBtnBottom.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import { gql, useQuery } from "@apollo/client";
import { useAppDispatch } from "src/redux/store/store";
import { Loader } from "src/components/common/Loader/Loader";
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
  actions: Function;
  title: string;
}> = ({ actions, title }) => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_LINKS, {
    variables: {
      Username: "hasan",
    },
  });
  console.log({ data: data?.username.vreel.elements.socials });

  if (loading) return null;
  return (
    <div
      className={Styles.buttonContainer}
      onClick={() => dispatch(actions(true))}
    >
      <p>{title}</p>
      <button></button>
    </div>
  );
};

export default BottomSheetButton;
