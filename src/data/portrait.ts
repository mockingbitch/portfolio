import image from '@/assets/avatar.jpeg';
import square from '@/assets/avatar-square.jpg';
import { profile } from '@/data/profile';

/**
 * The owner's portrait. `image` is the full photo (About page); `square` is a
 * head-and-shoulders crop of it (hero, structured data). Every size and format
 * used on the site is generated from these two files at build time.
 */
export const portrait = {
  image,
  square,
  alt: `Portrait of ${profile.name}`,
};
