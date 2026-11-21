import InteractiveDiagram from '@/components/diagrams/InteractiveDiagram.astro';
import Details from '@/components/ui/Details.astro';
import Placeholder from '@/components/ui/Placeholder.astro';

/** Components available in every MDX file without an import. */
export const mdxComponents = { Placeholder, InteractiveDiagram, Details };
