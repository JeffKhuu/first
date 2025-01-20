import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

const article = defineCollection({
    loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),

        heroImage: z.string(),
        tags: z.array(z.string()),

        publishDate: z.string().transform((str) => new Date(str)),
        nextPost: reference('article')
    })
})

export const collections = { article };