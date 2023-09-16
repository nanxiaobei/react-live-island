import { OutputBundle, OutputChunk, OutputOptions, Plugin } from 'rollup';

const rollupPluginUpdate = (update: (code: string) => string): Plugin => {
  function generateBundle(_: OutputOptions, bundle: OutputBundle) {
    for (const fileName in bundle) {
      const entryFile = bundle[fileName] as OutputChunk;
      if (entryFile.isEntry) {
        entryFile.code = update(entryFile.code);
      }
    }
  }

  return {
    name: 'update',
    generateBundle,
  };
};

export default rollupPluginUpdate;
