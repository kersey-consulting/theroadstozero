/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly ADMIN_USER?: string;
  readonly ADMIN_PASSWORD?: string;
  readonly BASIC_AUTH_USER?: string;
  readonly BASIC_AUTH_PASS?: string;
  readonly GA_CLIENT_EMAIL?: string;
  readonly GA_PRIVATE_KEY?: string;
  readonly GA_PROPERTY_ID?: string;
  readonly GA_HOSTNAMES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
