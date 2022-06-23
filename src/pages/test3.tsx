import useWindowDimensions from '@hooks/useWindowDimensions';
import Events from '@sections/Events/Events';
import MainContainer from '@sections/MainContainer/MainContainer';
import VLinks from '@sections/VLinks/VLinks';
import React from 'react';

function test3() {
  const { height } = useWindowDimensions();

  return (
    <div>
      <MainContainer>
        <VLinks />
      </MainContainer>
      {/* <VLinks /> */}
      {/* <div
        style={{
          background: "red",
          width: "100%",
          maxHeight: "100vh",
          height: `${height}px`,
          position: "relative",
        }}
      ></div> */}
      {/* <div
        style={{ background: "green", width: "100%", height: `${height}px` }}
      ></div> */}
    </div>
  );
}

export default test3;
