## Granulejs
A tool for developing software in a GOP(granule oriented programming) way

### Installation
Install it via npm (or yarn)
```
npm install
```

### Usage
```javascript
const Granule = require('granulejs')

const env = new Granule(testFunc, dataProvider)
```
Here `testFunc` is a function to test the context vars (optional, provided by `dataProvider` which is another function or an `Object`) fit environment currently which `this` binds on the injected class.  
```javascript
// ...
class ClassName {
    methodName () {
        // do sth...
    }
}
// ...

env.inject(ClassName, 'methodName', function (...params) {
    console.log('inject success')
    // do other things...
})
```
We inject this granule into a class called `ClassName`, change the behavior of method `methodName` under the situation `testFunc` defined.  
Notice `testFunc`, `dataProvider`, new behaviors defined in injections could be async function. So we must call this method with `await`, even all these functions above are sync.  
Use `extend` method to make a granule "extends" from parent granule. The child granule will not be active unless all its parents(a parent chain of granules) are active(pass their tests) and its own `testFunc` returns `true`.
```javascript
const childEnv = env.extend(newTest, newDataProvider)

childEnv.inject(NewClass, 'newMethodName',  function () {
    // do sth...
})
```
Child granule can inject the same class, the same method its parent does. Generally, each grandule can inject any class, but the last injected one (also it is active) can be executed. 

## Demo
See `/test/`