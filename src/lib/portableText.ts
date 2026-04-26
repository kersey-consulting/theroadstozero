export interface PortableTextChild {
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableTextChild[];
}

export type PortableInline =
  | { type: 'text'; text: string }
  | { type: 'strong'; text: string };

export type PortableNode =
  | { type: 'paragraph' | 'h3' | 'h4' | 'blockquote'; children: PortableInline[] }
  | { type: 'bulletList'; items: PortableInline[][] };

export function inlineChildren(children: PortableTextChild[] = []): PortableInline[] {
  return children
    .map((child) => {
      const text = child.text?.trim() ? child.text : child.text ?? '';
      if (!text) return null;
      return child.marks?.includes('strong')
        ? { type: 'strong', text }
        : { type: 'text', text };
    })
    .filter(Boolean) as PortableInline[];
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

    const children = inlineChildren(block.children ?? []);
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
