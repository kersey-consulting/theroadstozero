import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'the-road-to-zero',
  title: 'The Road to Zero',
  projectId: 'dm3m4n0d',
  dataset: 'production',
  plugins: [structureTool(), media()],
  schema: {
    types: schemaTypes,
  },
});
