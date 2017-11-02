const Granule = require('../../../src/index')
const Console = require('../base')
const colors = require('colors')

const testNode = function () {
    return typeof window === 'undefined' && typeof global === 'object'
}

const nodeEnv = new Granule(testNode);

nodeEnv.inject(Console, 'log', function (text) {
    console.log(text)
})

nodeEnv.inject(Console, 'error', function (text) {
    const raw = `[Error]:${text}`
    this._logWithLevel(raw, 'error')
})

nodeEnv.inject(Console, 'warn', function (text) {
    const raw = `[Warning]:${text}`
    this._logWithLevel(raw, 'warn')
})

nodeEnv.inject(Console, 'info', function (text) {
    const raw = `[Info]:${text}`
    this._logWithLevel(raw, 'info')
})

nodeEnv.inject(Console, '_logWithLevel', function (text, level) {
    console.log(colors[this.colors[level]](text))
})

module.exports = nodeEnv