export default function stringRenderer(req, res, str, htmlData, options) {
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
