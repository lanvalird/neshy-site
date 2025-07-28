import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  authors: z.array(z.string()).optional(),
  cover: z.string().optional(),
  full: z.boolean().optional(),
});

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: z.object({}),
  },
});

export default defineConfig({
  mdxOptions: {},
});
