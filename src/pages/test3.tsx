import Events from "@sections/Events/Events";
import MainContainer from "@sections/MainContainer/MainContainer";
import VLinks from "@sections/VLinks/VLinks";
import { Loader } from "@shared/Loader/Loader";
import React from "react";

function test3() {
  return (
    <MainContainer>
      <video
        style={{ position: "absolute", zIndex: "999", top: "0", left: "0" }}
        autoPlay
        loop
        muted
        width="100%"
        height="400"
      >
        <source
          src="https://www.youtube.com/embed/29avsYeMkdc"
          type="video/mp4"
        />
      </video>
    </MainContainer>
  );
}

export default test3;
