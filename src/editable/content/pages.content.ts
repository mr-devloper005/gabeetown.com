export const pagesContent = {
  home: {
    metadata: {
      title: 'Visual portfolios, profiles, and digital publishing',
      description: 'Explore image-rich posts, professional profiles, listings, articles, and resources through a polished publishing experience.',
      openGraphTitle: 'Visual portfolios, profiles, and digital publishing',
      openGraphDescription: 'Discover visual posts, professional profiles, listings, and resources through one polished publishing experience.',
      keywords: ['visual portfolios', 'professional profiles', 'digital publishing', 'content discovery'],
    },
    hero: {
      badge: 'Digital publishing platform',
      title: ['Digital publishing software', 'to grow your audience.'],
      description: 'Explore image-led posts, professional profiles, resources, and listings through a polished visual publishing experience.',
      primaryCta: { label: 'View products', href: '/image' },
      secondaryCta: { label: 'View features', href: '/profile' },
      searchPlaceholder: 'Search profiles, visuals, listings, and more',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images, profiles, and resources stay at the center of the experience without changing platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for visual browsing, profile discovery, and connected content.',
      paragraphs: [
        'This site brings together image-led browsing, article-style reading, professional profiles, and structured discovery so visitors can move naturally between content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore visuals, profiles, and resources through one connected experience.',
      description: 'Move between image-led posts, profiles, articles, listings, and resources through one clear visual system.',
      primaryCta: { label: 'Browse Visuals', href: '/image' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A polished way to explore visual work and professional profiles.',
    description: 'Gabeetown Publisher is built to make visual discovery, professional profiles, articles, and supporting resources feel like one unified experience.',
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Image-first discovery',
        description: 'We prioritize clarity, pacing, and structure so people can browse portfolios, posts, and profiles without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Articles, visual posts, listings, resources, and profiles stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact Gabeetown Publisher',
    title: 'Let us know what you want to publish, showcase, or improve.',
    description: 'Tell us about the profile, visual post, resource, or listing you are working on and we will route your note clearly.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find visuals, listings, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, profile, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
