export interface PortableTextBlock {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: { text?: string }[];
}

export type PortableNode =
  | { type: 'paragraph' | 'h3' | 'h4' | 'blockquote'; text: string }
  | { type: 'bulletList'; items: string[] };

export function blockText(block: PortableTextBlock) {
  return block.children?.map((c) => c.text).join('')?.trim() ?? '';
}

export function portableNodes(blocks: PortableTextBlock[] = []): PortableNode[] {
  const nodes: PortableNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      nodes.push({ type: 'bulletList', items: [...bulletBuffer] });
      bulletBuffer = [];
    }
  };

  for (const block of blocks) {
    const text = blockText(block);
    if (!text) continue;

    if (block.listItem === 'bullet') {
      bulletBuffer.push(text);
      continue;
    }

    flushBullets();

    if (block.style === 'h3') {
      nodes.push({ type: 'h3', text });
    } else if (block.style === 'h4') {
      nodes.push({ type: 'h4', text });
    } else if (block.style === 'blockquote') {
      nodes.push({ type: 'blockquote', text });
    } else {
      nodes.push({ type: 'paragraph', text });
    }
  }

  flushBullets();
  return nodes;
}
