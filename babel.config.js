const { NODE_ENV, BABEL_ENV } = process.env
let presetFlow = "@babel/preset-flow",
presetEnvConfig = {
    targets: "ie >= 11",
    modules: false,
    loose: true,
},
presetEnv = [
    "@babel/preset-env",
    presetEnvConfig
]

if (BABEL_ENV === 'es5') {
    presetEnvConfig.useBuiltIns = "usage"
}

if (BABEL_ENV === 'es6') {
    presetEnvConfig.exclude = ["transform-async-to-generator", "transform-regenerator"]
}
let config = {
    presets: [
        presetFlow,
        presetEnv
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
    ],
}
if (NODE_ENV === 'test') {
    config.plugins.push("transform-es2015-modules-commonjs")
}
module.exports = config