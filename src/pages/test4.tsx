import VideoPlayer from "@sections/Sliders/HeroSlider/HelperComps/SliderVideo/VideoPlayer";
import React from "react";
import Test4 from "src/components/Test/Test4/Test4";
import Test5 from "src/components/Test/Test5/Test5";

export default function test4() {
  return (
    <div>
      {/* <Test4 /> */}
      {/* <Test5 /> */}
      <VideoPlayer
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        autoplay={true}
        muted={true}
      />
    </div>
  );
}
