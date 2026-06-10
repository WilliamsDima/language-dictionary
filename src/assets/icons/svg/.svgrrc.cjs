const template = require('./svgr-template.cjs')

module.exports = {
  native: true,
  typescript: true,
  icon: true,
  svgo: true,
  svgoConfig: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: { overrides: { removeViewBox: false } },
      },
      { name: 'removeDimensions', active: true },
      { name: 'convertColors', params: { currentColor: true } },
      { name: 'removeXMLNS', active: true },
    ],
  },
  exportType: 'named',
  template,
}
