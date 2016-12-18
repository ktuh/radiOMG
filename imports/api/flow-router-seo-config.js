import { FlowRouterSEO } from 'meteor/tomwasd:flow-router-seo';

export const SEO = new FlowRouterSEO({ database: true });

SEO.setDefaults({
  title: '808mix',
  description: 'A community for Hawaii music, culture, and nightlife.',
  meta: {
    'name="viewport"': 'width=device-width, initial-scale=1',
    'name="fragment"': '!',
    'property="og:type"': 'website',
    'property="og:site_name"': '808mix',
    'property="og:url"': 'http://808mix.com',
    'property="og:image"': 'http://808mix.com/img/808-mixtapes-logo-v4.png',
    'name="twitter:description"': 'A community website for Hawaii music, culture, and nightlife.',
    'name="twitter:site"': '@808mix',
    'name="twitter:image"': 'http://808mix.com/img/808-mixtapes-logo-v4.png',
    'name="twitter:url"': 'http://808mix.com',
    'name="twitter:card"': 'A community website for Hawaii music, culture, and nightlife.'
  }
});