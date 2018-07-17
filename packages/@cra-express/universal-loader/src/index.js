import createUniversalMiddleware from './universal'
import stringRenderer from './renderer/string-renderer'
import streamRenderer from './renderer/stream-renderer'

function universalLoader(app, options) {
  const universalMiddleware = createUniversalMiddleware(options);
  app.use('/', universalMiddleware);
  return app;
}

export default universalLoader;
export { stringRenderer, streamRenderer };
