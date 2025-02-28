import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      plugins: [
        autoprefixer(),
        cssnano()
      ],
      extract: false,
      minimize: true,
      sourceMap: true,
    }),
  ],
  external: ['react', 'react-dom', 'react-bootstrap']
};
