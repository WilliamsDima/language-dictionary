const fs = require('fs')
const path = require('path')

const SVG_SRC_DIR = path.join(__dirname, '../src/assets/icons/svg/src')
const SVG_COMPONENTS_DIR = path.join(
  __dirname,
  '../src/assets/icons/svg/components'
)
const IMAGE_SRC_DIR = path.join(__dirname, '../src/assets/images')
const ICON_FILE = path.join(__dirname, '../src/assets/icons/Icon.tsx')
const REGISTRY_FILE = path.join(__dirname, '../src/assets/icons/registry.ts')

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp'])

function stripExtension(fileName) {
  return fileName.replace(/\.[^.]+$/, '')
}

function fileNameToKebabCase(fileName) {
  return stripExtension(fileName)
}

function fileNameToPascalCase(fileName) {
  return stripExtension(fileName)
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function fileNameToExportName(fileName) {
  return `Svg${fileNameToPascalCase(fileName)}`
}

function readFiles(dir, predicate) {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir).filter(predicate).sort()
}

const svgFiles = readFiles(SVG_SRC_DIR, (file) => file.endsWith('.svg'))
const imageFiles = readFiles(IMAGE_SRC_DIR, (file) =>
  IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())
)

readFiles(SVG_COMPONENTS_DIR, (file) => file.endsWith('.tsx')).forEach(
  (file) => {
    const componentPath = path.join(SVG_COMPONENTS_DIR, file)
    const content = fs.readFileSync(componentPath, 'utf8')

    if (!content.startsWith('// @ts-nocheck')) {
      fs.writeFileSync(componentPath, `// @ts-nocheck\n${content}`, 'utf8')
    }
  }
)

const svgNames =
  svgFiles.map((file) => `  | '${fileNameToKebabCase(file)}'`).join('\n') ||
  '  | never'

const switchCases = svgFiles
  .map((file) => {
    const kebabName = fileNameToKebabCase(file)
    const pascalName = fileNameToPascalCase(file)
    const exportName = fileNameToExportName(file)

    return `      case '${kebabName}': {
        const {${exportName}} = require('./svg/components/${pascalName}')
        return <SvgIcon Component={${exportName}} {...svgProps} />
      }`
  })
  .join('\n')

const imageRegistryEntries = imageFiles
  .map(
    (file) => `  '${fileNameToKebabCase(file)}': require('../images/${file}'),`
  )
  .join('\n')

const registryFileContent = `import type {ImageSourcePropType} from 'react-native'

export const imageIcons = {
${imageRegistryEntries}
} as const satisfies Record<string, ImageSourcePropType>
`

const iconFileContent = `import React from 'react'
import {SvgProps} from 'react-native-svg'
import {SvgIcon} from './variants/SvgIcon'
import {ImageIcon} from './variants/ImageIcon'
import {imageIcons} from './registry'
import type {ImageResizeMode, ImageStyle, StyleProp, ViewStyle} from 'react-native'

export type SvgName =
${svgNames}

export type ImageName = keyof typeof imageIcons

type SvgPublicProps = Omit<SvgProps, 'style'> & {
  style?: StyleProp<ViewStyle>
  color?: SvgProps['color']
}

type KindMap = {
  svg: {
    name: SvgName
  } & SvgPublicProps
  image: {
    name: ImageName
    width: number
    height: number
    style?: StyleProp<ImageStyle>
    resizeMode?: ImageResizeMode
  }
}

export function Icon<K extends keyof KindMap>(props: {kind: K} & KindMap[K]) {
  if (props.kind === 'svg') {
    const svgProps = props as {kind: 'svg'} & KindMap['svg']
    switch (svgProps.name) {
${switchCases}
      default:
        return null
    }
  }

  const imageProps = props as {kind: 'image'} & KindMap['image']
  const src = imageIcons[imageProps.name]

  return (
    <ImageIcon
      src={src}
      style={[{width: imageProps.width, height: imageProps.height}, imageProps.style]}
      resizeMode={imageProps.resizeMode}
    />
  )
}
`

fs.writeFileSync(REGISTRY_FILE, registryFileContent, 'utf8')
fs.writeFileSync(ICON_FILE, iconFileContent, 'utf8')

console.log('Icon.tsx and registry.ts successfully updated!')
console.log(
  `Updated ${svgFiles.length} svg icons: ${svgFiles
    .map((file) => fileNameToKebabCase(file))
    .join(', ')}`
)
console.log(
  `Updated ${imageFiles.length} image icons: ${imageFiles
    .map((file) => fileNameToKebabCase(file))
    .join(', ')}`
)
