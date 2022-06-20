import VreelSlider from "src/components/VreelSlider/VreelSlider";

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
  return <VreelSlider view="Mobile" />;
}
