const React = require('react');
const { renderToNodeStream } = require('react-dom/server');

function handleUniversalRender(reactElement) {
  return (req, res) => renderToNodeStream(reactElement);
}

export default handleUniversalRender;
