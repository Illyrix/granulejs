class Console {
    constructor() {
        this.colors = {
            error: 'red',
            warn: 'yellow',
            info: 'black'
        }
    }

    log(text) {
        window.console.log(text)
    }

    _logWithLevel(text, level) {
        window.console.log(text, 'color:' + this.colors[level])
    }

    error(text, code = undefined) {
        const raw = '%c[Error' + (code ? code : '') + `]:${text}`
        this._logWithLevel(raw, 'error')
    }

    warn(text, code = undefined) {
        const raw = '%c[Warning' + (code ? code : '') + `]:${text}`
        this._logWithLevel(raw, 'warn')
    }

    info(text) {
        const raw = `[Info]:%c${text}`
        this._logWithLevel(raw, 'info')
    }
}

module.exports = Console