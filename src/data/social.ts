export interface SocialLink {
  label: string;
  /** TODO: replace the placeholder URLs with your own profiles. */
  href: string;
  /** Short handle displayed next to the label. */
  handle: string;
}

export const social: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/your-username', handle: '@your-username' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle/', handle: 'in/your-handle' },
];
