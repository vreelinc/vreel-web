import { useState } from "react";

import Sections from "src/components/Sections/Sections";

const vreel = {
  author: "can7os223akuve30qlgg",
  elements: {
    socials: {
      header: "",
      socials: [
        {
          platform: "twitter",
          username: "vreel",
        },
      ],
    },
    videos: {
      header: "",
      position: 2,
      videos: [1, 2, 3, 4, 5, 6, 7].map((e) => {
        return {
          mobile: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/videos/test-video-${e}.mp4`,
            content_type: "video",
          },
          desktop: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/videos/test-video-${e}.mp4`,
            content_type: "video",
          },
          cta1: {
            link_header: "Sign Up",
            link_type: "URL",
            link_url: "/register",
          },
          cta2: {
            link_header: "Login",
            link_type: "URL",
            link_url: "/login",
          },
        };
      }),
    },
    gallery: {
      header: "",
      position: 3,
      images: [1, 2, 3, 4].map((e) => {
        return {
          mobile: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/images/test-image (${e}).jpg`,
            content_type: "image",
          },
          desktop: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/images/test-image (${e}).jpg`,
            content_type: "image",
          },
          cta1: {
            link_header: "Sign Up",
            link_type: "URL",
            link_url: "/register",
          },
          cta2: {
            link_header: "Login",
            link_type: "URL",
            link_url: "/login",
          },
        };
      }),
      hidden: false,
    },
    simple_links: {
      header: "",
      links: [
        {
          id: "candi5i23akkasd8kg6g",
          thumbnail:
            "https://staging.vreel.page/files/6dbd0edfdc7e4cfd8c36d32d6401da92",
          link_header: "Black Embition prize",
          url: "https://staging.vreel.page/files/6dbd0edfdc7e4cfd8c36d32d6401da92",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candjpa23akkasd8kg70",
          thumbnail:
            "https://staging.vreel.page/files/364fb06406188a4d0d0a9b28af83ebef",
          link_header: "Black Embition prize 2",
          url: "https://staging.vreel.page/files/364fb06406188a4d0d0a9b28af83ebef",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candmoq23akkasd8kg7g",
          thumbnail:
            "https://staging.vreel.page/files/7453964216168b85c8c64a5f9b6990f5",
          link_header: "Black Embition prize 2",
          url: "https://staging.vreel.page/files/7453964216168b85c8c64a5f9b6990f5",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candn1a23akkasd8kg80",
          thumbnail:
            "https://staging.vreel.page/files/1b0f235025c5c3b4fdf9b1d0a43a1733",
          link_header: "Black Embition prize 4",
          url: "https://staging.vreel.page/files/1b0f235025c5c3b4fdf9b1d0a43a1733",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candn9q23akkasd8kg8g",
          thumbnail:
            "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_header: "Black Embition 5",
          url: "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candnba23akkasd8kg90",
          thumbnail:
            "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_header: "Black Embition 6",
          url: "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_type: "url",
          tag: "shop",
        },
      ],
    },
  },
  slides: [
    "https://res.cloudinary.com/klwebco/video/upload/v1655863954/samples/aiexplainer_optimized_o24q3q.mp4",
    /* "https://res.cloudinary.com/klwebco/video/upload/v1655858114/samples/pexels-rodnae-productions-7895613_itn7mi.mp4",
    "https://res.cloudinary.com/klwebco/video/upload/v1645686813/samples/elephants.mp4",
    "https://res.cloudinary.com/klwebco/video/upload/v1645686811/samples/sea-turtle.mp4", */
  ].map((e) => {
    return {
      id: "canefb223akkasd8kg9g",
      slide_location: 1,
      content_type: "",
      uri: "",
      title: {
        header: "Hello 1",
        description: "World",
      },
      advanced: {
        header: "Hello",
      },
      mobile: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: null,
        uri: e,
        content_type: "video",
      },
      desktop: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: null,
        uri: e,
        content_type: "video",
      },
      cta1: {
        link_header: "Sign Up",
        link_type: "URL",
        link_url: "/register",
      },
      cta2: {
        link_header: "Login",
        link_type: "URL",
        link_url: "/login",
      },
    };
  }),
};
export default function Home({ vreel }) {
  // const router = useRouter();
  // const [currentSlide, setCurrentSlide] = useState(null);
  // const { username } = router?.query;
  // const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
  //   variables: {
  //     username: "/",
  //   },
  // });
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
  const [swiper, setSwiper] = useState(null);

  console.log({ vreel });

  return <Sections data={vreel} />;
}

export async function getServerSideProps() {
  return {
    props: { vreel },
  };
}
