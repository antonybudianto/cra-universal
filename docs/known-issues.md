---
id: known-issues
title: Known Issues
---

List of known issues:
- Importing svg/img file will cause runtime warning on development (asset import didn't re-hydrate properly due filename mismatch), but the errors are gone after production build
  - Solution: https://github.com/antonybudianto/cra-universal/issues/16#issuecomment-392305234
- Latest React Loadable `v5.x.x` is not compatible, for now please stick to version `v4.x.x` or use [loadable-components](https://github.com/smooth-code/loadable-components)
- Using renderToNodeStream limits you to:
  - render helmet on server
  - isomorphic css
  - sending custom status code based on app router context
- If you enabled Service worker, it's expected to see non-rendered page when viewing the page source (somehow page source will show SW-cached page). You can use curl to check the rendered page
- Fetching data based on route is on Alpha stage, please visit [@cra-express/redux-prefetcher](https://github.com/antonybudianto/create-react-app-express/tree/master/packages/redux-prefetcher)

If you've ideas on how to solve the issue, please discuss or send a PR!
