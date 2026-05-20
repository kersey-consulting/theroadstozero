export interface FaqItem {
  question?: string;
  answer?: Array<{
    children?: Array<{ text?: string }>;
  }>;
}

export interface PageSection {
  _type?: string;
  items?: FaqItem[];
}

interface BuildJsonLdOptions {
  title: string;
  description?: string;
  url: string;
  sections?: PageSection[];
}

const stripPortableText = (blocks: FaqItem['answer'] = []) => {
  return blocks
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export function buildJsonLd({ title, description = '', url, sections = [] }: BuildJsonLdOptions) {
  const jsonLd: Record<string, any>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url,
    },
  ];

  const faqItems = sections
    .filter((section) => section._type === 'faqSection')
    .flatMap((section) => section.items ?? [])
    .filter((item) => item.question && Array.isArray(item.answer) && item.answer.length > 0)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripPortableText(item.answer),
      },
    }))
    .filter((item) => item.acceptedAnswer.text);

  if (faqItems.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems,
    });
  }

  return jsonLd;
}
