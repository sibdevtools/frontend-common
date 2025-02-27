import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

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
      extract: true, // Извлечение CSS в отдельный файл
      modules: false, // Отключение CSS-модулей (если не нужно)
      minimize: true, // Минификация CSS
    }),
  ],
  external: ['react', 'react-dom', 'react-bootstrap']
};
