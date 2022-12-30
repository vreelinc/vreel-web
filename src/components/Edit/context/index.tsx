import { components } from "@edit/data";
import EditorLayout from "@edit/Layout/Layout";
import { setModule } from "@redux/createSlice/editorSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  return <EditorLayout children={children} userId="" />;
}
