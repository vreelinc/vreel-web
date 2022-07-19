import SectionContainer from '@sections/SectionContainer/SectionContainer';
import React from 'react';
import Styles from './Test4.module.scss';

const Test4 = () => {
  return (
    <SectionContainer title='Link'>
      <div className={Styles.content}>Hello</div>
    </SectionContainer>
  );
};

export default Test4;
