const nodeEnv = require('./nodeEnv.granule')
const Console = require('../base')

const test = async function (path) {
    const fs = require('fs')
    return await new Promise(r => {
        fs.open(path, 'a+', (err, fd) => {
            if (err) {
                r(false)
            } else {
                fs.close(fd, err => {
                    if (err) {
                        r(false)
                    } else {
                        r(true)
                    }
                })
            }
        })
    })
}

const generatePath = function () {
    const date = new Date()
    const path = require('path')
    return path.resolve(__dirname, '../log/', (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + '.log')
}

const fileLog = nodeEnv.extend(test, generatePath)

const writeFile = (path, text) => new Promise(
    (resolve, reject) => {
        const fs = require('fs')
        fs.appendFile(path, text, function (err) {
            if (err) {
                reject(err)
            }
            resolve()
        })
    }
)

fileLog.inject(Console, 'log', async function (text) {
    const path = generatePath()
    await writeFile(path, text + "\n")
})

fileLog.inject(Console, 'warn', async function (text) {
    await this._logWithLevel(`[Warning]:${text}`)
})

fileLog.inject(Console, 'error', async function (text) {
    await this._logWithLevel(`[Error]:${text}`)
})

fileLog.inject(Console, 'info', async function (text) {
    await this._logWithLevel(`[Info]:${text}`)
})

fileLog.inject(Console, '_logWithLevel', async function (text) {
    const path = generatePath()
    await writeFile(path, text + "\n")
})

module.exports = fileLog