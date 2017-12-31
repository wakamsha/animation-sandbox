const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: './src/scripts/main.ts',
    output: {
        path: path.resolve(__dirname, 'public/assets/'),
        filename: 'app.js'
    },
    cache: true,
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
    },
    module: {
        loaders: [
            {
                'test': /\.tsx?$/,
                'loaders': ['ts-loader'],
                'exclude': [/node_modules/, nodeModulesPath]
            }
        ]
    }
};
