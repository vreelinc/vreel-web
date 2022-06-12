import { FunctionComponent } from 'react';
import Embed from './Element/childrens/Embed';
import Events from './Element/childrens/Events';
import ImageGallery from './Element/childrens/ImageGallery';
import MusicLinks from './Element/childrens/Music';
import SimpleLink from './Element/childrens/SimpleLink';
import Socials from './Element/childrens/Socials';
import TextArea from './Element/childrens/TextArea';

export interface ElementsType {
  title: string;
  active: boolean;
  component?: FunctionComponent;
}

export const elements: ElementsType[] = [
  {
    title: 'Text Area 1',
    active: true,
    component: TextArea,
  },
  {
    title: 'Simple Link 1',
    active: true,
    component: SimpleLink,
  },
  {
    title: 'Super Link 1',
    active: true,
    component: SimpleLink,
  },
  {
    title: 'Image Gallery',
    active: true,
    component: ImageGallery,
  },
  {
    title: 'Socials',
    active: true,
    component: Socials,
  },
  {
    title: 'Text Area 2',
    active: false,
    component: TextArea,
  },
  {
    title: 'Simple Link 2',
    active: false,
    component: SimpleLink,
  },
  {
    title: 'Simple Link 3',
    active: false,
    component: SimpleLink,
  },
  {
    title: 'Music Links',
    active: false,
    component: MusicLinks,
  },
  {
    title: 'Embed 1',
    active: false,
    component: Embed,
  },
  {
    title: 'Embed 2',
    active: false,
    component: Embed,
  },
  {
    title: 'Super Link 2',
    active: false,
    component: SimpleLink,
  },
  {
    title: 'Events',
    active: false,
    component: Events,
  },
];
