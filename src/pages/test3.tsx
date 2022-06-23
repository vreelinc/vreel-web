import useWindowDimensions from '@hooks/useWindowDimensions';
import Events from '@sections/Events/Events';
import VLinks from '@sections/VLinks/VLinks';
import DisplayColor from '@shared/DisplayColor/DisplayColor';
import React from 'react';

function test3() {
  const { height } = useWindowDimensions();

  return (
    <div
      style={{
        backgroundColor: '#424242',
        height: '100vh',
        width: '30%',
        margin: '0 auto',
        padding: '5rem 1rem',
      }}
    >
      <DisplayColor />
      {/* <Events /> */}
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
