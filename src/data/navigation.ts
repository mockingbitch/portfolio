export interface NavItem {
  label: string;
  /** Internal paths must end with a trailing slash. */
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'Work', href: '/projects/' },
  { label: 'Architecture', href: '/architecture/' },
  { label: 'About', href: '/about/' },
  { label: 'Notes', href: '/notes/' },
  { label: 'Contact', href: '/contact/' },
];
