import { FlowRouterSEO } from 'meteor/tomwasd:flow-router-seo';

export const SEO = new FlowRouterSEO({ database: true });

SEO.setDefaults({
  title: 'KTUH Honolulu',
  description: 'The only station that loves you.',
  meta: {
    'name="viewport"': 'width=device-width, initial-scale=1',
    'name="fragment"': '!',
    'property="og:type"': 'website',
    'property="og:site_name"': '808mix',
    'property="og:url"': 'http://808mix.com',
    'property="og:image"': 'http://808mix.com/img/808-mixtapes-logo-v4.png',
    'name="twitter:description"': 'The only station that loves you.',
    'name="twitter:site"': '@ktuh_fm',
    'name="twitter:image"': 'http://808mix.com/img/808-mixtapes-logo-v4.png',
    'name="twitter:url"': 'http://808mix.com',
    'name="twitter:card"': 'The only station that loves you.'
  }
});
