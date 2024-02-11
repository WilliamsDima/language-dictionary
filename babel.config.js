module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@/assets': './src/assets',
          '@/app': './src/app',
          '@/pages': './src/pages',
          '@/entities': './src/entities',
          '@/features': './src/features',
          '@/hooks': './src/shared/hooks',
          '@/helpers': './src/shared/helpers',
          '@/shared': './src/shared',
          '@/widgets': './src/widgets',
          '@/processes': './src/processes',
          '@/store': './src/shared/store',
          '@/constants': './src/shared/constants',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
