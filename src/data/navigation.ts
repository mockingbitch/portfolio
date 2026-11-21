export interface NavItem {
  label: string;
  /** Internal paths must end with a trailing slash. */
  href: string;
}

/** Header navigation. Keep this short; everything else lives in the footer. */
export const navigation: NavItem[] = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Architecture', href: '/architecture/' },
  { label: 'Deep Dives', href: '/deep-dives/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/** Full sitemap, grouped, for the footer. */
export const footerNavigation: { title: string; items: NavItem[] }[] = [
  {
    title: 'Work',
    items: [
      { label: 'Projects', href: '/projects/' },
      { label: 'Architecture Lab', href: '/architecture/' },
      { label: 'Playground', href: '/architecture/playground/' },
      { label: 'Open Source', href: '/open-source/' },
    ],
  },
  {
    title: 'Engineering',
    items: [
      { label: 'Deep Dives', href: '/deep-dives/' },
      { label: 'Insights', href: '/insights/' },
      { label: 'Search', href: '/search/' },
    ],
  },
  {
    title: 'Profile',
    items: [
      { label: 'About', href: '/about/' },
      { label: 'Expertise', href: '/expertise/' },
      { label: 'Leadership', href: '/leadership/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];
