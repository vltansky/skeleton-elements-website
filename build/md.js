const { Remarkable } = require('remarkable');
const toc = require('markdown-toc');
const highlight = require('./highlight');

const md = new Remarkable({
  html: true,
  highlight,
}).use((remarkable) => {
  remarkable.renderer.rules.heading_open = (tokens, idx) => {
    return `<h${tokens[idx].hLevel} id=${toc.slugify(
      tokens[idx + 1].content,
    )}>`;
  };
});

module.exports = (fileContent) => {
  const vars = {};
  const varsString = fileContent.split('---\n')[1].split('---\n')[0].trim();
  varsString.split('\n').forEach((varLine) => {
    vars[varLine.split(':')[0]] = varLine.split(':')[1].trim();
  });

  const mdConent = fileContent.split('---\n')[2];

  const html = md.render(mdConent);

  return { vars, html };
};
