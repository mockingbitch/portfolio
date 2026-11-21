export interface SocialLink {
  label: string;
  href: string;
  /** Short handle displayed next to the label. */
  handle: string;
}

export const social: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/mockingbitch', handle: '@mockingbitch' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jarvis-phong-tran', handle: 'in/jarvis-phong-tran' },
];
