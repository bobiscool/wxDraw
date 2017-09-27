import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';


export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'dist/wxdraw.min.js',
  plugins: [
      babel({
          exclude: 'node_modules/**',
      }),
      uglify()
  ],
  banner: ""
};
