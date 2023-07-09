

function createSiteMap(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '<url>\n';
    xml += `<loc>https://${process.env['DOMAIN_WITHOUT_PROTOCOL']}${url.URL}</loc>\n`;
    xml += `<lastmod>${url.lastmod.toISOString()}</lastmod>\n`;
    xml += `<changefreq>${url.changefreq}</changefreq>\n`;
    xml += `<priority>${url.priority}</priority>\n`;
    xml += '</url>\n';
  });
  
  xml += '</urlset>\n';

  return xml
}


module.exports = createSiteMap


