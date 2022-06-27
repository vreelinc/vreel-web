import React from 'react';
import Styles from '../../HeroSlide/HeroSlide.module.scss';

const SliderImage: React.FC<{
  url: string;
}> = ({ url }) => {
  return (
    <>
      <img
        className={Styles.image}
        src={url}
        alt=''
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </>
  );
};

export default SliderImage;
