var HTMLParser = require('fast-html-parser');

const fictionDetailsParser = (data, Author) => {
  let root = HTMLParser.parse(data);

  let rows = root.querySelectorAll('tr');
  let desc = root.querySelectorAll('.description');
  let imgrows = root.querySelectorAll('.record_side');
  let mirrors = root.querySelectorAll('.record_mirrors');

  // Image link Parsing------------------------------------------------------------------------------
  let imglink = JSON.stringify(imgrows[0].childNodes[1].rawAttrs).split('\\')[1].replace('"', '');

  //Summary Parsing----------------------------------------------------------------------------------
  let summary = desc.length !== 0 ? JSON.stringify(desc[0].rawText).replace('"SUMMARY:', '') : '';

  //Download Links Parsing--------------------------------------------------------------------------
  let dlinks = [];
  mirrors[0].childNodes.map(item => {
    dlinks.push(JSON.stringify(item.childNodes[0].rawAttrs.replace('href="', '')));
  });

  //Details Parsing----------------------------------------------------------------------------------
  let details = '';
  for (let i = 0; i < rows.length; i++) {
    details += JSON.stringify(
      rows[i].rawText
        .replace('\n\t\t', '')
        .replace('\n\t', '')
        .replace('\n', '')
        .replace(/&nbsp;/g, ' ')
    );
  }
  let detailsarr = details.split('\\t');

  for (let i = 0; i < detailsarr.length; i++) {
    if (detailsarr[i] === '' || detailsarr[i] === '\\n') {
      detailsarr.splice(i, 1);
      i = 0;
    }
  }
  detailsarr.pop();
  detailsarr.pop();
  detailsarr.pop();
  let detailsarr1 = detailsarr.splice(0, 14);
  if (Author === '') {
    detailsarr.splice(3, 0, '');
  }
  let ext = detailsarr[detailsarr.length - 7]; //File Extension

  return {imglink, summary, ext, dlinks, detailsarr, detailsarr1};
};

export default fictionDetailsParser;
