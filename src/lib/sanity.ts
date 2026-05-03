import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityClient } from '@sanity/client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'dm3m4n0d';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2026-03-31';

export function isPreviewEnabled() {
  return import.meta.env.SANITY_PREVIEW_ENABLED === 'true';
}

export function createSanityClient(preview = isPreviewEnabled()) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview,
    token: preview ? import.meta.env.SANITY_PREVIEW_TOKEN : undefined,
    perspective: preview ? 'drafts' : 'published',
  });
}

export const sanityClient = createSanityClient(false);
export const previewSanityClient = createSanityClient(true);

const publishedBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return publishedBuilder.image(source);
}

export function getSanityClient(preview = isPreviewEnabled()): SanityClient {
  return preview ? previewSanityClient : sanityClient;
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
    socialLinks[]{ platform, url },
    "homeServiceCategories": homeServiceCategories[]->{
      _id,
      title,
      slug,
      homeCardTitle,
      homeCardDescription,
      "image": image.asset->url,
      "homeCardImage": homeCardImage.asset->url
    }
  }`,

  navigation: `*[_type == "navigation"][0]{
    items[]{
      _key, label, href,
      children[]{ _key, label, href }
    }
  }`,

  homePage: `*[_type == "page" && slug.current == "home"][0]{
    title, seo,
    sections[]{
      _type,
      _key,
      ...,
      categories[]->{
        _id,
        title,
        slug,
        homeCardTitle,
        homeCardDescription,
        "image": image.asset->url,
        "homeCardImage": homeCardImage.asset->url
      },
      services[]->{
        _id,
        name,
        slug,
        type,
        tagline,
        shortDescription,
        keyBenefits,
        "image": image.asset->url,
        category->{ slug }
      },
      "imageUrl": select(
        defined(image.asset->url) => image.asset->url,
        defined(image) && image match '/*' => image,
        null
      ),
      "backgroundImageUrl": select(
        defined(backgroundImage.asset->url) => backgroundImage.asset->url,
        defined(backgroundImage) && backgroundImage match '/*' => backgroundImage,
        null
      )
    }
  }`,

  pageBySlug: `*[_type == "page" && slug.current == $slug][0]{
    title, seo,
    body[]{...},
    sections[]{
      _type,
      _key,
      ...,
      services[]->{
        _id,
        name,
        slug,
        type,
        tagline,
        shortDescription,
        keyBenefits,
        "image": image.asset->url,
        category->{ slug }
      },
      "imageUrl": select(
        defined(image.asset->url) => image.asset->url,
        defined(image) && image match '/*' => image,
        null
      ),
      "backgroundImageUrl": select(
        defined(backgroundImage.asset->url) => backgroundImage.asset->url,
        defined(backgroundImage) && backgroundImage match '/*' => backgroundImage,
        null
      )
    }
  }`,

  serviceCategoryBySlug: `*[_type == "serviceCategory" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    seo,
    sections[]{
      _type,
      _key,
      ...,
      services[]->{
        _id,
        name,
        slug,
        type,
        tagline,
        shortDescription,
        keyBenefits,
        "image": image.asset->url,
        category->{ slug }
      },
      "imageUrl": select(
        defined(image.asset->url) => image.asset->url,
        defined(image) && image match '/*' => image,
        null
      ),
      "backgroundImageUrl": select(
        defined(backgroundImage.asset->url) => backgroundImage.asset->url,
        defined(backgroundImage) && backgroundImage match '/*' => backgroundImage,
        null
      )
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
    _id,
    name,
    slug,
    type,
    tagline,
    shortDescription,
    heroText,
    description,
    requiresConsultation,
    seo,
    "image": image.asset->url,
    "heroImage": heroImage.asset->url,
    "category": category->{ title, slug },
    sections[]{
      _type,
      _key,
      ...,
      services[]->{
        _id,
        name,
        slug,
        type,
        tagline,
        shortDescription,
        keyBenefits,
        "image": image.asset->url,
        category->{ slug }
      },
      "imageUrl": select(
        defined(image.asset->url) => image.asset->url,
        defined(image) && image match '/*' => image,
        null
      ),
      "backgroundImageUrl": select(
        defined(backgroundImage.asset->url) => backgroundImage.asset->url,
        defined(backgroundImage) && backgroundImage match '/*' => backgroundImage,
        null
      )
    },
    benefits[]{ title, description },
    addOns[]{ name, detail },
    "pairsWith": pairsWith[]->{ name, slug },
    keyBenefits
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
