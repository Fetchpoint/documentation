// Adapted with thanks from
// hmsk/vite-plugin-markdown
// Please see the original repo https://github.com/hmsk/vite-plugin-markdown/blob/main/src/index.ts
// Original code provided under MIT license

import type { Plugin } from 'vite'
import type { TransformResult } from 'rollup'
import fs from 'fs';

export enum Mode {
  HTML = 'html',
}

export interface PluginOptions {
  mode?: Mode[]
  markdown?: (body: string) => string
}

const tf = (code: string, id: string, options: PluginOptions): TransformResult => {
  if (!id.endsWith('.md')) return null;
  let f = fs.readFileSync(id,'utf8').toString().replace(/(\r\n|\n|\r)/gm,'\n');
  return {
    code:`export const html = ${JSON.stringify(f)}`
  }
}

export const plugin = (options: PluginOptions = {}): Plugin => {
  return {
    name: 'vite-plugin-markdown',
    enforce: 'pre',
    transform (code, id) {
      return tf(code, id, options)
    },
  }
}

export default plugin