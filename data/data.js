import data from './portfolio_sites.json';

const filter = site => {
  if (site.name && site.site && site.desc) return true;
  return false;
};

const munge = portfolio => {
  const tags = [];

  const { single_page, blog_centric, supports_https, ...rest } = portfolio;

  if (single_page) tags.append('single_page');
  if (blog_centric) tags.append('blog_centric');
  if (supports_https) tags.append('supports_https');
  if (rest.face) tags.append('has_face');
  if (rest.blog) tags.append('has_blog');
  if (rest.mail) tags.append('has_mail');

  rest.tld = rest.site.split('/')[2].split('.').at(-1);
  rest.url_length = rest.site.split('//')[1].length;
  rest.last_updated = Date.now();

  return { tags, ...rest };
};

export default data.filter(filter).map(munge);
