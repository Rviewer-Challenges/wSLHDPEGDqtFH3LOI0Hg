const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        entry: "./src/main.js",
        devServer: {
            hot: true,
        },
        watch: true,
        watchOptions: {
            ignored: /node_modules/,
            poll: 1000,
        },
    }
})
