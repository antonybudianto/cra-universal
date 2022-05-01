import { renderToPipeableStream } from 'react-dom/server';

export default function pipeStreamRenderer(
  req,
  res,
  reactEl,
  htmlData,
  options
) {
  let str;
  let error;

  try {
    const { pipe } = renderToPipeableStream(reactEl, {
      onAllReady() {
        /**
         * Allows full customization
         */
        if (typeof options.onAllReady === 'function') {
          return options.onAllReady({ req, res, htmlData, error, pipe });
        }

        res.statusCode = error ? 500 : 200;
        res.setHeader('Content-type', 'text/html');

        const segments = htmlData.split(`<div id="root">`);
        const errorScript = error
          ? '<script type="text/javascript">window.__ssrError=true;</script>'
          : '';

        /**
         * Return fallback when error
         */
        if (error) {
          res.send(
            `${segments[0]}${errorScript}\n<div id="root">${segments[1]}`
          );
          return;
        }

        res.write(segments[0] + errorScript + '<div id="root">');

        pipe(res);

        if (typeof options.onEndReplace === 'function') {
          segments[1] = options.onEndReplace(segments[1]);
        }

        res.write(segments[1]);
        res.end();
      },
      onShellError(x) {
        console.error('crau/ssr-shell-error: ', x.message);
        error = true;
      },
    });
  } catch (e) {
    console.error('crau/ssr-catch-error: ', e.message);
    res.send(500);
  }
}
