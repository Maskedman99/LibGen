var HTMLParser = require('fast-html-parser');

const magazineParser = data => {
  let links = [];
  let titles = data.replace(/<(?:.|\n)*?>/gm, '').split('\n');
  HTMLParser.parse(data)
    .querySelectorAll('a')
    .map(item => {
      links.push(JSON.stringify(item.rawAttrs).replace('"href=', '').replace('"', ''));
    });

  return {titles, links};
};

export default magazineParser;
