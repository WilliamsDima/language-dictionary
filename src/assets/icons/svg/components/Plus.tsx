// @ts-nocheck
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgPlus = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg viewBox="0 0 32 32" width={24} height={24} {...props}>
          <Path
            fill="currentColor"
            fillRule="evenodd"
            d="M22 17h-5v5a1.001 1.001 0 0 1-2 0v-5h-5a1.001 1.001 0 0 1 0-2h5v-5a1.001 1.001 0 0 1 2 0v5h5a1.001 1.001 0 0 1 0 2M16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0"
          />
        </Svg>,
        {
          ...(size != null
            ? {
                width: size,
                height: size,
              }
            : {}),
          ref,
          ...props,
        }
      )
    }
  )
)
export { SvgPlus }
