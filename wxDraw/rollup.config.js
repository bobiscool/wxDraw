import babel from 'rollup-plugin-babel';


export default {
    input: 'src/index.js',
    output: {
        file: 'dist/wxdraw.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            babelrc: true
        })
    ],
    watch: {
        include: 'src/**'
    },
    banner: ""
};
