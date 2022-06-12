export interface NavItemTypes {
  id: number;
  title: string;
  href: string;
}

export const NavItem: NavItemTypes[] = [
  {
    id: 1,
    title: 'Slides',
    href: '/slides',
  },
  {
    id: 2,
    title: 'Welcome',
    href: '/welcome',
  },
  {
    id: 3,
    title: 'Links',
    href: '/link',
  },
  {
    id: 4,
    title: 'Socials',
    href: '/social',
  },
  {
    id: 5,
    title: 'Events',
    href: '/events',
  },
];

export const AccMenus: NavItemTypes[] = [
  {
    id: 1,
    title: 'View VReel',
    href: '/view',
  },
  {
    id: 2,
    title: 'Edit VReel',
    href: '/edit/edit_vreel/files',
  },
  {
    id: 3,
    title: 'News Feed',
    href: '/news',
  },
  {
    id: 4,
    title: 'Analytics',
    href: '/analytics',
  },
  {
    id: 5,
    title: 'Contacts',
    href: '/contacts',
  },
  {
    id: 6,
    title: 'Help',
    href: '/help',
  },
];
