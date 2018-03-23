# with-package

> Run any command with package.json properties exposed as environment variables

[![NPM][with-package-icon]][with-package-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![renovate-app badge][renovate-badge]][renovate-app]

Imagine you want to use variables from the `package.json` in the script commands.
Now you can. For example, let us say you want to commit and tag the git branch
with the current `version` label. Install `with-package` and use it as first keyword
in the command

    npm install --save-dev with-package

```json
"scripts": {
  "release": "with-package git commit -am pkg.version && with-package git tag pkg.version"
},
```

Just refer to any primitive property of `package.json` as `pkg.<property name>`. Objects and
arrays are not supported. If you need to debug the substitution, add `--debug` or `-d` flag
to the command.

    with-package echo this is pkg.description --debug

Note: some of the `package.json` variables are already exposed as environment variables,
see [this doc](https://docs.npmjs.com/misc/scripts#package-json-vars).

## Small print

Author: Gleb Bahmutov &copy; 2015
[@bahmutov](https://twitter.com/bahmutov) [glebbahmutov.com](http://glebbahmutov.com)
[glebbahmutov.com/blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github

[with-package-icon]: https://nodei.co/npm/with-package.svg?downloads=true
[with-package-url]: https://npmjs.org/package/with-package
[ci-image]: https://travis-ci.org/bahmutov/with-package.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/with-package
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
