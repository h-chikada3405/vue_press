import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import * as sass from 'sass';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    customCompileSass({
      outPutFileName: 'editor-style.css',
      files: {
        input: './src/assets/scss/editor.scss',
        output: './wp/themes/theme/css'
      }
    })
  ],
  server: {
    port: 3000,
  },
});

type CompileProps = {
  input: string,
  output: string
}

type CustomArgs = {
  outPutFileName: String,
  files: CompileProps | CompileProps[]
}

function customCompileSass(args: CustomArgs) {
  async function compileSass(filePath: CompileProps | CompileProps[]) {
    Array.isArray(filePath) ? filePath.map((p: CompileProps) => compile(p)) : compile(filePath)
  }

  function compile(filePath: CompileProps) {
    const inputPath = path.resolve(__dirname, filePath.input);
    const outputPath = path.relative(__dirname, `${filePath.output}/${args.outPutFileName}`);
    try {
      const result = sass.compile(inputPath);
      fs.writeFileSync(outputPath, result.css);
    } catch(err) {
      console.error('Sass compilation error:', err)
    }
  }

  return {
    name: 'custom-sass-compiler',
    async buildStart() {
      // 初期ビルド時に Sass をコンパイル
      await compileSass(args.files);
    },
    async handleHotUpdate({ file }) {
      // 特定の Sass ファイルが変更された場合にコンパイル
      if (file.endsWith('.scss')) {
        await compileSass(args.files);
      }
    },
  }
}
