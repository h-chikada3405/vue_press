import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import env from "vite-plugin-env-compatible";
import * as sass from 'sass';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    env({ prefix: "VITE", mountedPath: "process.env" }),
    vue(),
    Pages(),
    fetchGlobalStyles(),
    customCompileSass({
      outPutFileName: 'editor-style.css',
      files: {
        input: './src/assets/scss/editor.scss',
        output: './wp/themes/theme/css'
      }
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  }
});

type CompileProps = {
  input: string,
  output: string
}

type CustomArgs = {
  outPutFileName: String,
  files: CompileProps | CompileProps[]
}

/**
 * WordPressのグローバルスタイルを取得するViteプラグイン
 * @returns Viteプラグインオブジェクト
 */
function fetchGlobalStyles() {
  return {
    name: 'fetch-global-styles',
    /**
     * ビルド開始時にグローバルスタイルを取得し保存する
     */
    async buildStart() {
      try {
        const baseUrl = process.env.VITE_BASE_URL;
        const apiBasePath = process.env.VITE_API_BASE_PATH;
        const response = await axios.get(`${baseUrl}${apiBasePath}/global-styles`);
        if (response.data && typeof response.data === 'string') {
          fs.writeFileSync(path.resolve(__dirname, 'src/assets/scss/_wp/_base.scss'), response.data);
        } else {
          console.warn('Global styles data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching global styles:', error.message);
      }
    }
  }
}

/**
 * カスタムSassコンパイラープラグイン
 * @param args - コンパイラーの設定
 * @param args.outPutFileName - 出力ファイル名
 * @param args.files - コンパイル対象のファイル情報
 * @param args.files.input - 入力ファイルのパス
 * @param args.files.output - 出力ディレクトリのパス
 * @returns Viteプラグインオブジェクト
 */
function customCompileSass(args: CustomArgs) {
  /**
   * Sassファイルをコンパイルする
   * @param {Object|Object[]} filePath - コンパイル対象のファイル情報
   */
  async function compileSass(filePath: CompileProps | CompileProps[]) {
    Array.isArray(filePath) ? filePath.map((p: CompileProps) => compile(p)) : compile(filePath)
  }

  /**
   * 単一のSassファイルをコンパイルする
   * @param filePath - コンパイル対象のファイル情報
   * @param filePath.input - 入力ファイルのパス
   * @param filePath.output - 出力ディレクトリのパス
   */
  function compile(filePath: CompileProps): void {
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
    /**
     * 初期ビルド時に Sass をコンパイル
     */
    async buildStart() {
      await compileSass(args.files);
    },
    /**
     *  特定の Sass ファイルが変更された場合にコンパイル
     */
    async handleHotUpdate({ file }) {
      if (file.endsWith('.scss')) {
        await compileSass(args.files);
      }
    },
  }
}
