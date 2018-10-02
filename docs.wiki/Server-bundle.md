Since we're using [Webpack Node Externals](https://www.npmjs.com/package/webpack-node-externals), we deliberately excluding packages we imported from the bundle.

If you'd like to whitelist some packages, you can list them here:
https://github.com/antonybudianto/cra-universal/blob/master/templates/server/webpack.config.js#L21

If you share the packages from CRA client, then you need to list them too, otherwise your app production bundle won't run because lack of package installation.
