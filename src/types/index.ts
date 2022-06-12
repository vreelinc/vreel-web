import React, { FunctionComponent } from 'react';

export interface Icons {
  src: string;
  alt: string;
  className?: string;
  method?: Function;
}

export interface RightSidebar {
  topIcons: Array<Icons>;
  bottomIcons: Array<Icons>;
}

export interface VreelSlideProps {
  swiper: any;
  slideId: any;
  slide: {
    src: string;
    alt: string;
  };
  currentSlide: number;
  isUserName : string,
}

export interface EditItem {
  title: string;
  href: string;
  pathname?: string;
  children?: Array<{
    title: string;
    href: string;
    method?: Function;
  }>;
  method?: Function;
}

export interface EditComponent {
  title: string;
  component: any;
}
