const SITE_URL = "https://komorebi.constella-hd.co.jp";
const SITE_NAME = "こもれび";
const AUTHOR_NAME = "こもれび編集部";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
  faq?: { question: string; answer: string }[];
  breadcrumbs?: BreadcrumbItem[];
};

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  tags,
  faq,
  breadcrumbs,
}: ArticleJsonLdProps) {
  const url = `${SITE_URL}${path}`;

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { name: "トップ", href: "/" },
    { name: "学ぶ", href: "/learn" },
    { name: title },
  ];

  const crumbs = breadcrumbs ?? defaultBreadcrumbs;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: title,
      description,
      author: { "@type": "Organization", name: AUTHOR_NAME },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      datePublished,
      dateModified: dateModified ?? datePublished,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: "ja",
      ...(tags && { keywords: tags.join(", ") }),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        ...(crumb.href && { item: `${SITE_URL}${crumb.href}` }),
      })),
    },
  ];

  if (faq && faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        alternateName: "こもれび — 子育ての案内所",
        url: SITE_URL,
        description:
          "子育ての負担と不安を減らし、子に向ける時間を増やす。AIが状況を整理し、今必要な情報・手続き・準備を案内します。",
        inLanguage: "ja",
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "AIコンシェルジュ付き子育て支援プラットフォーム。妊娠中から乳幼児期まで、制度・健康・準備の情報を整理してお届けします。",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
