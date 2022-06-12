import type { EditComponent, EditItem } from '../../types';
import AccSettings from './components/AccountSettings/AccSettings/AccSettings';
import PersonalInfo from './components/AccountSettings/PersonalInfo/PersonalInfo';
import DisplayOptions from './components/DisplayOptions';
import Elements from './components/Elements';
import EditFiles from './components/Files/EditFiles/EditFiles';
import NewsFeed from './components/NewsFeed';
import Slides from './components/Slides/Slides/Slides';

export const regularOptions: Array<EditItem> = [
  {
    title: 'News feed',
    pathname: '/edit/news_feed',
    href: '/edit/news_feed',
  },
  {
    title: 'View Vreel',
    href: '/',
  },
  {
    title: 'Edit Vreel',
    pathname: '/edit/edit_vreel',
    href: '/edit/edit_vreel/files',
    children: [
      { title: 'File Manager', href: '/edit/edit_vreel/files' },
      { title: 'Slides', href: '/edit/edit_vreel/slides' },
      { title: 'Elements', href: '/edit/edit_vreel/elements' },
      {
        title: 'Display Options',
        href: '/edit/edit_vreel/display_options',
      },
      {
        title: 'Account',
        href: '/edit/edit_vreel/account',
      },
    ],
  },
];

export const editOptions: Array<EditItem> = [
  { title: 'File Manager', href: '/edit/edit_vreel/files' },
  { title: 'Slides', href: '/edit/edit_vreel/slides' },
  { title: 'Elements', href: '/edit/edit_vreel/elements' },
  {
    title: 'Display Options',
    href: '/edit/edit_vreel/display_options',
  },
  {
    title: 'Account',
    href: '/edit/edit_vreel/account',
  },
];

export const advanceOptions: Array<EditItem> = [
  {
    title: 'Events',
    href: '/edit/events',
  },
  {
    title: 'Display Mode',
    href: '/edit/display_mode',
  },
  {
    title: 'Networks',
    href: '/edit/networks',
  },
  {
    title: 'Tags',
    href: '/edit/tags',
  },
  {
    title: 'Enterprise',
    href: '/edit/enterprise',
  },
];

export const footerOptions: Array<EditItem> = [
  {
    title: 'Analytics',
    href: '/analytics',
  },
  {
    title: 'Contacts',
    href: '/contacts',
  },
  {
    title: 'Help',
    href: '/help',
  },
];

export const components: Array<EditComponent> = [
  // {
  //   title: 'news_feed',
  //   component: NewsFeed,
  // },
  {
    title: 'files',
    component: EditFiles,
  },
  {
    title: 'elements',
    component: Elements,
  },
  {
    title: 'slides',
    component: Slides,
  },

  {
    title: 'display_options',
    component: DisplayOptions,
  },
  {
    title: 'account',
    component: AccSettings,
  },
];
