const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Without watchman (Windows) Metro's fallback watcher crawls native build
// outputs that Gradle/CMake create and delete during builds and crashes with
// ENOENT, so exclude them from the file map.
const nativeBuildDirs = /[/\\]android[/\\](build|\.cxx)([/\\].*)?$/;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    blockList: [
      ...[defaultConfig.resolver.blockList].flat().filter(Boolean),
      nativeBuildDirs,
    ],
    assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(
      ext => ext !== 'svg',
    ),
    sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
