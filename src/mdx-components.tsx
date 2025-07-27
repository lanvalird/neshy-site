import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    img: (props) => <ImageZoom className="rounded-lg" {...(props as any)} />,
    ...components,
  };
}
