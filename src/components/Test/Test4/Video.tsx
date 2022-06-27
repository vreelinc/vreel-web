import React, { useRef, useState } from 'react';

const Video = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const videoPress = () => {
    if (playing) {
      // videoRef.current.pause();
      setPlaying(false);
      videoRef.current.pause();

      console.log('I am from playing..........');
    } else {
      videoRef.current.play();
      setPlaying(true);
      console.log('I am from not playing..........');
    }
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <button
        onClick={videoPress}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'rgba(255,255,255,.75)',
          padding: '1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          zIndex: '1',
        }}
      >
        Click!
      </button>

      <video
        poster='/assets/images/man.svg'
        ref={videoRef}
        autoPlay={playing}
        loop
        muted
        playsInline
        src='https://vod-progressive.akamaized.net/exp=1656345255~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1930%2F11%2F284652268%2F1071341449.mp4~hmac=0500e5deaf96c8e345804d8c839669bca90e9c0f21a26595582a27e1f1f69a09/vimeo-prod-skyfire-std-us/01/1930/11/284652268/1071341449.mp4?filename=Pexels+Videos+1321208.mp4'
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }}
      ></video>
    </div>
  );
};

export default Video;
