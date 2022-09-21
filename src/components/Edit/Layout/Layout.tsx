import { useQuery } from "@apollo/client";
import SecureRoute from "@auth/SecureRoute/SecureRoute";
import { GET_PAGES_BY_TOKEN } from "@graphql/query";
import { setEditorPages } from "@redux/createSlice/editorSlice";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import DesktopDashboard from "./Desktop/DesktopDashboard";
import MobileDashboard from "./Mobile/MobileDashboard";

const Layout: React.FC<{ userId: string }> = ({ userId }) => {
  const [{ userAuthToken: token }] = useCookies(["userAuthToken"])
  const { data, error } = useQuery(GET_PAGES_BY_TOKEN, { variables: { token } });
  const [pages, setPages] = useState([{ name: "default", id: userId || "" }]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      if (data) {
        const pageData = []
        data.getUserByToken.pages.forEach((page, idx) => {
          pageData.push({ name: `Page ${idx + 1}`, id: page.id })
        });
        setPages(prev => [...prev, ...pageData])
      }
      if (error) {
        alert(error.message)
      }
    }
  }, [data, error, userId])

  useEffect(() => {
    dispatch(setEditorPages(pages))
  }, [pages])

  return (
    <>
      <DesktopDashboard pages={pages} />
      <MobileDashboard />
    </>
  );
};

export default SecureRoute(Layout);
