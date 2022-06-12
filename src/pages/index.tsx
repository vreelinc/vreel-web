import { useQuery } from "@apollo/client";
import { Loader } from "src/components/common/Loader/Loader";
import { GET_USER_BY_USER_NAME } from "src/components/graphql/query";
import VreelSlider from "../components/VreelSlider/VreelSlider";

export default function Home() {
  /* const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: { username: "sagor" },
  });

  if (loading) {
    return <Loader />;
  }

  data?.username?.vreel?.slides.map((D) => {
    console.log(D.desktop);
  });
 */
  return (
    <div>
      <VreelSlider view="Desktop" />
    </div>
  );
}
