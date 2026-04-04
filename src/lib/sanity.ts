import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'dm3m4n0d',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-31',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ── GROQ Queries ──

export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    businessName,
    phone,
    email,
    bookingUrl,
    "logo": logo.asset->url,
    "goldLogo": goldLogo.asset->url,
    socialLinks[]{ platform, url }
  }`,

  navigation: `*[_type == "navigation"][0]{
    items[]{
      _key, label, href,
      children[]{ _key, label, href }
    }
  }`,

  homePage: `*[_type == "page" && slug.current == "home"][0]{
    title, seo,
    sections[]{ _type, _key, ... }
  }`,

  pageBySlug: `*[_type == "page" && slug.current == $slug][0]{
    title, seo,
    body[]{...},
    sections[]{ _type, _key, ... }
  }`,

  serviceCategories: `*[_type == "serviceCategory"] | order(order asc){
    _id, title, slug, description,
    "image": image.asset->url
  }`,

  serviceCategoryBySlug: `*[_type == "serviceCategory" && slug.current == $slug][0]{
    _id, title, slug, description, heroText, seo,
    "image": image.asset->url,
    "heroImage": heroImage.asset->url,
    "services": *[_type == "service" && references(^._id)] | order(order asc){
      _id, name, slug, type, tagline, shortDescription,
      "image": image.asset->url, keyBenefits
    }
  }`,

  servicesByCategorySlug: `*[_type == "service" && category->slug.current == $slug] | order(order asc){
    _id,
    name,
    slug,
    type,
    tagline,
    shortDescription,
    keyBenefits,
    "image": image.asset->url
  }`,

  serviceBySlug: `*[_type == "service" && slug.current == $slug][0]{
    _id, name, slug, type, tagline, heroText, description,
    requiresConsultation,
    "image": image.asset->url,
    "heroImage": heroImage.asset->url,
    seo,
    benefits[]{ title, description },
    addOns[]{ name, detail },
    "pairsWith": pairsWith[]->{ name, slug },
    "category": category->{ title, slug }
  }`,

  allServices: `*[_type == "service"]{
    slug,
    "categorySlug": category->slug.current
  }`,

  staffMembers: `*[_type == "staffMember"] | order(order asc){
    _id, name, role, credentials, bio,
    "photo": photo.asset->url
  }`,
};
