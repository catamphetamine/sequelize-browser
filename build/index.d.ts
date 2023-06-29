function build(options: { input: string, output: string, minify: boolean, format: 'iife' | 'cjs' | 'esm' }): Promise<void>;

export default build;
