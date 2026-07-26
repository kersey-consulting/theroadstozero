export interface PortableTextChild {
  text?: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _key?: string;
  _type?: string;
  href?: string;
}

export interface PortableTextBlock {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableTextChild[];
  markDefs?: PortableTextMarkDef[];
}

export type PortableInline =
  | { type: 'text'; text: string }
  | { type: 'strong'; children: PortableInline[] }
  | { type: 'em'; children: PortableInline[] }
  | { type: 'link'; href: string; children: PortableInline[] };

export type PortableNode =
  | { type: 'paragraph' | 'h3' | 'h4' | 'blockquote'; children: PortableInline[] }
  | { type: 'bulletList'; items: PortableInline[][] };

/**
 * Converts a span's `marks` into nested inline nodes.
 *
 * Marks are wrapped innermost-first (em, then strong, then link) so a span
 * carrying several of them renders as `<a><strong><em>…`. Previously a strong
 * span produced `{ type: 'strong', text }` while the renderer read
 * `node.children`, so every bold run rendered as an empty `<strong></strong>`
 * and its text was dropped — 74 of them on /faq alone.
 */
export function inlineChildren(
  children: PortableTextChild[] = [],
  markDefs: PortableTextMarkDef[] = [],
): PortableInline[] {
  return children.flatMap((child) => {
    const text = child.text ?? '';
    if (!text) return [];

    const marks = child.marks ?? [];
    let node: PortableInline = { type: 'text', text };

    if (marks.includes('em')) node = { type: 'em', children: [node] };
    if (marks.includes('strong')) node = { type: 'strong', children: [node] };

    // Any mark that is not a decorator is a key into markDefs — that is how
    // Sanity attaches link annotations.
    const link = markDefs.find((def) => def._key && def._type === 'link' && marks.includes(def._key));
    if (link?.href) node = { type: 'link', href: link.href, children: [node] };

    return [node];
  });
}

export function blockText(block: PortableTextBlock) {
  return block.children?.map((c) => c.text).join('')?.trim() ?? '';
}

export function portableNodes(blocks: PortableTextBlock[] = []): PortableNode[] {
  const nodes: PortableNode[] = [];
  let bulletBuffer: PortableInline[][] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      nodes.push({ type: 'bulletList', items: [...bulletBuffer] });
      bulletBuffer = [];
    }
  };

  for (const block of blocks) {
    const text = blockText(block);
    if (!text) continue;

    const children = inlineChildren(block.children ?? [], block.markDefs ?? []);
    if (children.length === 0) continue;

    if (block.listItem === 'bullet') {
      bulletBuffer.push(children);
      continue;
    }

    flushBullets();

    if (block.style === 'h3') {
      nodes.push({ type: 'h3', children });
    } else if (block.style === 'h4') {
      nodes.push({ type: 'h4', children });
    } else if (block.style === 'blockquote') {
      nodes.push({ type: 'blockquote', children });
    } else {
      nodes.push({ type: 'paragraph', children });
    }
  }

  flushBullets();
  return nodes;
}
