import 'core-js';

import data from './portfolio_sites.json';

const filter = site => {
  if (site.name && site.site && site.desc) return true;
  return false;
};

const munge = portfolio => {
  const tags = [];

  const { single_page, blog_centric, supports_https, ...rest } = portfolio;

  if (single_page) tags.push('single_page');
  if (blog_centric) tags.push('blog_centric');
  if (supports_https) tags.push('supports_https');
  if (rest.face) tags.push('has_face');
  if (rest.blog) tags.push('has_blog');
  if (rest.mail) tags.push('has_mail');
  if (rest.open) tags.push('open_source');

  rest.tld = rest.site.split('/')[2].split('.').at(-1);
  rest.url_length = rest.site.split('//')[1].length;
  rest.last_updated = Date.now();

  return { tags, ...rest };
};

export default data.filter(filter).map(munge);
