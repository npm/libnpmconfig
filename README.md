# libnpmconfig [![npm version](https://img.shields.io/npm/v/libnpmconfig.svg)](https://npm.im/libnpmconfig) [![license](https://img.shields.io/npm/l/libnpmconfig.svg)](https://npm.im/libnpmconfig) [![Travis](https://img.shields.io/travis/npm/libnpmconfig.svg)](https://travis-ci.org/npm/libnpmconfig) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/zkat/libnpmconfig?svg=true)](https://ci.appveyor.com/project/zkat/libnpmconfig) [![Coverage Status](https://coveralls.io/repos/github/npm/libnpmconfig/badge.svg?branch=latest)](https://coveralls.io/github/npm/libnpmconfig?branch=latest)

[`libnpmconfig`](https://github.com/npm/libnpmconfig) is a Node.js library for
programmatically managing npm's configuration files and data.

## Example

```js
const config = require('libnpmconfig')

console.log('configured registry:', config.read({
  registry: 'https://default.registry/'
}))
// => configured registry: https://registry.npmjs.org
```

## Install

`$ npm install libnpmconfig`

## Table of Contents

* [Example](#example)
* [Install](#install)
* [API](#api)

### API

##### <a name="read"></a> `> read(moreOpts, readOpts)`

Reads configurations from the filesystem and the env and returns a
[`figgy-pudding`](https://npm.im/figgy-pudding) object with the configuration
values.

If `moreOpts` is provided, it will be merged with the returned config pudding,
shadowing any read values.

If `readOpts.cwd` is provided, it will be used instead of `process.cwd()` as the
starting point for config searching.

If `readOpts.userconfig` is provided, it will be used as the user configuration
file, shadowing `moreOpts.userconfig`, which is also acceptable.
