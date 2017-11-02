class Granule {
    // notice that test and external (if is a function) could be async
    // this of test function binded on base class
    constructor(test, external = null) {
        this.parent = null

        // or external is a function to provide external vars
        this.test = test
        this.external = external
            // every time external will provide testParams for test function
        this.testParams = function (obj) {
            if (typeof external === 'function') {
                return external.call(obj)
            } else if (typeof external === 'object') {
                return external
            }
        }
    }

    async testWrapper(obj) {
        let parentTest = true
        if (!!this.parent && typeof this.parent.test === 'function') {
            parentTest = await this.parent.testWrapper.call(this.parent, await this.parent.testParams(obj))
        }
        return parentTest && await this.test.call(obj, await this.testParams(obj))
    }

    inject(base, method, func) {
        const self = this
        const originMethod = base.prototype[method]

        base.prototype[method] = async function (...params) { // avoid to use '=>'
            if (await self.testWrapper(this)) {
                return func.apply(this, params)
            } else {
                return originMethod.apply(this, params)
            }
        }
    }

    extend(test, external) {
        const child = new Granule(test, external)
        child.parent = this
        return child
    }
}

module.exports = Granule