import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Visual publishing and profile discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Visual publishing and profile discovery',
    primaryLinks: [
      { label: 'Products', href: '/image' },
      { label: 'Features', href: '/profile' },
      { label: 'Examples', href: '/listing' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'View products', href: '/image' },
      secondary: { label: 'Contact us', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Visual portfolios, profiles, and discoverable resources',
    description: 'A polished publishing surface for image-rich post, and downloadable resources.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/article' },
          { label: 'Listings', href: '/listing' },
          { label: 'Images', href: '/image' },
          { label: 'PDF Library', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery, visual browsing, and connected publishing.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
