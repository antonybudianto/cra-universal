import { renderToNodeStream } from 'react-dom/server'

export default function streamRenderer(req, res, reactEl, htmlData, options) {
  const stream = renderToNodeStream(reactEl)
  const segments = htmlData.split(`<div id="root">`);
  res.write(segments[0] + `<div id="root">`);
  stream.pipe(res, { end: false })
  stream.on('end', () => {
    if (options.onEndReplace) {
      segments[1] = options.onEndReplace(segments[1])
    }
    res.write(segments[1]);
    res.end();
  });
}
