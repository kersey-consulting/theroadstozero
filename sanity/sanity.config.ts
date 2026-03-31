import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'the-road-to-zero',
  title: 'The Road to Zero',
  projectId: '<your-project-id>', // Replace after `npx sanity init`
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
