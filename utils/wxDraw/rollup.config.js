import babel from 'rollup-plugin-babel';


export default {
  entry: 'index.js',
  format: 'cjs',
  dest: 'dist/wxdraw.js',
  plugins: [
      babel({
          exclude: 'node_modules/**',
      })
  ],
  banner: "wxDraw"
};
