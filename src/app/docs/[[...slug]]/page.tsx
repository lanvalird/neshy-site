import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

export default async function RootDocsPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0 text-lg text-fd-muted-foreground">
        {page.data.description}
      </DocsDescription>
      {page.data.authors && (
        <div className="mb-8 text-sm text-muted-foreground text-right">
          ~ {page.data.authors.join(", ")}
        </div>
      )}
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

interface MetadataProps {
  params: { slug?: string[] };
}

interface PageMetadata {
  title: string;
  description?: string;
  author?: string;
  authors?: string[];
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<PageMetadata> {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { title, description, authors } = page.data;

  return {
    title,
    description,
    ...(authors?.length && {
      author: authors[0],
      authors,
    }),
  };
}
