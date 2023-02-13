// Adapted with thanks from
// hmsk/vite-plugin-markdown
// Please see the original repo https://github.com/hmsk/vite-plugin-markdown/blob/main/src/index.ts
// Original code provided under MIT license

import type { Plugin } from 'vite'
import type { TransformResult } from 'rollup'
import MarkdownIt from 'markdown-it'
import fs from 'fs';

export enum Mode {
  HTML = 'html',
}

export interface PluginOptions {
  mode?: Mode[]
  markdown?: (body: string) => string
  markdownIt?: MarkdownIt | MarkdownIt.Options
}

const markdownCompiler = (options: PluginOptions): MarkdownIt | { render: (body: string) => string } => {
  if (options.markdownIt) {
    if (options.markdownIt instanceof MarkdownIt || (options.markdownIt?.constructor?.name === 'MarkdownIt')) {
      return options.markdownIt as MarkdownIt
    } else if (typeof options.markdownIt === 'object') {
      return MarkdownIt(options.markdownIt)
    }
  } else if (options.markdown) {
    return { render: options.markdown }
  }
  return MarkdownIt({ html: true, xhtmlOut: false }) // TODO: xhtmlOut should be got rid of in next major update
}

const tf = (code: string, id: string, options: PluginOptions): TransformResult => {
  if (!id.endsWith('.md')) return null;
  let f = fs.readFileSync(id,'utf8').toString().replace(/(\r\n|\n|\r)/gm,'\n');
  console.log(`export const html = ${JSON.stringify(f)}`);
  
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