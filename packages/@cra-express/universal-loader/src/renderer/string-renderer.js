import { renderToString } from 'react-dom/server';

export default function stringRenderer(req, res, reactEl, htmlData, options) {
  let str
  try {
    str = renderToString(reactEl)
  } catch (err) {
    if (options.renderClientOnError) {
      str = ''
    } else {
      console.error('Error ocurred during the rendered execution', err);
      res.send(500);
      return
    }
  }
  const segments = htmlData.split(`<div id="root">`);
  if (options.onEndReplace) {
    segments[1] = options.onEndReplace(segments[1])
  }
  const finalStr = `${segments[0]}<div id="root">${str}${segments[1]}`
  if (options.onFinish) {
    options.onFinish(req, res, finalStr)
    return
  }
  res.send(finalStr);
}
