import { renderToPipeableStream } from 'react-dom/server';

/**
 * Reference:
 * https://reactjs.org/docs/react-dom-server.html#rendertopipeablestream
 * @param {Request} req
 * @param {Response} res
 * @param {JSX.Element} reactEl
 * @param {string} htmlData
 * @param {any} options
 */

export default function pipeStreamRenderer(
  req,
  res,
  reactEl,
  htmlData,
  options
) {
  let str;
  let error;
  const segments = htmlData.split(`<div id="root">`);
  const streaming = reactEl.props.streaming || false;

  const processStream = (res, stream) => {
    res.statusCode = error ? 500 : 200;
    res.setHeader('Content-type', 'text/html');

    const errorScript = error
      ? '<script type="text/javascript">window.__ssrError=true;</script>'
      : '';

    res.write(
      segments[0] +
        errorScript +
        `<div id="root" data-streaming="${streaming ? 1 : 0}">`
    );

    stream.pipe(res);
  };

  try {
    const stream = renderToPipeableStream(reactEl, {
      onShellReady() {
        if (typeof options.onShellReady === 'function') {
          return options.onShellReady({ req, res, htmlData, error, stream });
        }

        if (streaming) {
          processStream(res, stream);
        }
      },
      onAllReady() {
        if (typeof options.onAllReady === 'function') {
          return options.onAllReady({ req, res, htmlData, error, stream });
        }

        if (!streaming) {
          processStream(res, stream);
        }
        res.write(segments[1]);
      },
      onError(e) {
        error = true;
        console.error('crau/ssr-on-error', e.message);
      },
      onShellError(x) {
        /**
         * Return fallback when error
         */
        error = true;
        console.error('crau/ssr-on-shell-error: ', x.message);
        res.send(`${segments[0]}${errorScript}\n<div id="root">${segments[1]}`);
      },
    });
  } catch (e) {
    console.error('crau/ssr-catch-error: ', e.message);
    res.send(500);
  }
}
