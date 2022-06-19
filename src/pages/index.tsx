import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { GET_USER_BY_USER_NAME } from "src/components/graphql/query";
import VreelSlider from "src/components/VreelSlider/VreelSlider";

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(null);
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: "/",
    },
  });
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
  console.log({ data });

  return (
    <div>
      <VreelSlider view="Mobile" />
    </div>
  );
}
