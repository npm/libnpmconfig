'use strict'

const fs = require('fs')
const figgyPudding = require('figgy-pudding')
const ini = require('ini')
const os = require('os')
const path = require('path')

const NpmConfig = figgyPudding({}, {
  // Open up the pudding object.
  other () { return true }
})

const ConfigOpts = figgyPudding({
  cache: { default: path.join(os.homedir(), '.npm') },
  cwd: { default: () => process.cwd() },
  userconfig: { default: path.join(os.homedir(), '.npmrc') }
})

module.exports.read = getNpmConfig
function getNpmConfig (_opts, configOpts) {
  const opts = NpmConfig(_opts)
  const copts = ConfigOpts(configOpts)
  const configs = copts.cwd.split(path.sep).reduce((acc, next) => {
    acc.path = path.join(acc.path, next)
    acc.configs.push(maybeReadIni(path.join(acc.path, '.npmrc')))
    acc.configs.push(maybeReadIni(path.join(acc.path, 'npmrc')))
    return acc
  }, {
    path: '',
    configs: []
  }).configs.concat(
    maybeReadIni(copts.userconfig || opts.userconfig)
  ).filter(x => x)
  const env = Object.keys(process.env).reduce((acc, key) => {
    if (key.match(/^npm_config_/i)) {
      const newKey = key.toLowerCase()
        .replace(/^npm_config_/i, '')
        .replace(/(?!^)_/g, '-')
      acc[newKey] = process.env[key]
    }
    return acc
  }, {})
  const newOpts = NpmConfig(...configs, env, _opts)
  if (newOpts.cache) {
    return newOpts.concat({
      cache: path.join(newOpts.cache, '_cacache')
    })
  } else {
    return newOpts
  }
}

function maybeReadIni (f) {
  let txt
  try {
    txt = fs.readFileSync(f, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      return ''
    } else {
      throw err
    }
  }
  return ini.parse(txt)
}
