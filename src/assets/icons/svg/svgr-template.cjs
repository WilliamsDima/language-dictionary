module.exports = function template(variables, { tpl }) {
  const { componentName, jsx, imports } = variables

  return tpl`
    // @ts-nocheck
    ${imports}

    type IconProps = SvgProps & { size?: number }

    const ${componentName} = React.memo(
      React.forwardRef(( { size, ...props }: IconProps, ref: React.Ref<React.ComponentRef<typeof Svg>> ) => {
        return React.cloneElement(
          ${jsx},
          { ...(size != null ? { width: size, height: size } : {}), ref, ...props }
        )
      })
    )

    export {${componentName}}
  `
}
