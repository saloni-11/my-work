import type { ImageMetadata } from 'astro';

// Cover images live in src/assets/projects/, named after the project file
// (e.g. study-companion.jpg). Adding one needs no frontmatter change.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/projects/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

const bySlug = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const slug = path.split('/').pop()!.replace(/\.(jpe?g|png|webp)$/i, '');
  bySlug.set(slug, mod.default);
}

export function projectImage(slug: string): ImageMetadata | undefined {
  return bySlug.get(slug);
}
