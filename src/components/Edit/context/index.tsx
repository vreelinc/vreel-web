import { components } from "@edit/data";
import EditFiles from "@edit/Files/EditFiles/EditFiles";
import DesktopDashboard from "@edit/Layout/Desktop/DesktopDashboard";
import EditorLayout from "@edit/Layout/Layout";
import MobileForm from "@edit/Layout/Mobile/MobileForm";
import { setModule } from "@redux/createSlice/editorSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

interface EditorContextProps {
  module: String;
  children: React.ReactNode;
}

export default function EditorContext({
  children,
  module,
}: EditorContextProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [{ userAuthToken }] = useCookies(["userAuthToken"]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1023);

  function handleResize() {
    setIsMobile(window.innerWidth < 1023)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  //   const { component: Component } = components.find(
  //     ({ title }) => title === module
  //   );
  useEffect(() => {
    if (!userAuthToken) {
      router.push("/login");
      return;
    }
    dispatch(setModule(module));
  }, []);
  if (!module) {
    if (isMobile) {
      return <MobileForm />
    } else {
      return <DesktopDashboard children={<EditFiles />} />
    }

  }
  return <EditorLayout mobile={isMobile} children={children} userId="" />;
}
