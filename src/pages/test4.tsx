import VideoPlayer from "@sections/Sliders/HeroSlider/HelperComps/SliderVideo/VideoPlayer";
import React, { useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";

export default function test4() {
  const [hlsUrl, setHlsUrl] = useState(
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  );
  const videoRef = useRef();
  return (
    <div>
      {/* <ReactHlsPlayer
        playerRef={videoRef}
        src={hlsUrl}
        autoPlay={false}
        controls={true}
        width="60%"
        height="auto"
        hlsConfig={{
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          lowLatencyMode: true,
          enableWorker: true,
        }}
      /> */}
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
