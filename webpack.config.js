module.exports = {
    entry: "./test/index.js",
    output: {
        path: __dirname + '/bundle',
        filename: "main.js"
    },
    module: {
        loaders: []
    }
};