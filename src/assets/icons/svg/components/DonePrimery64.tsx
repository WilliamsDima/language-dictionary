// @ts-nocheck
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgDonePrimery64 = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg fill="none" viewBox="0 0 24 24" width={24} height={24} {...props}>
          <Path
            fill="currentColor"
            fillRule="evenodd"
            d="M19.707 6.293a1 1 0 0 1 0 1.414L10.414 17a2 2 0 0 1-2.828 0l-4.293-4.293a1 1 0 1 1 1.414-1.414L9 15.586l9.293-9.293a1 1 0 0 1 1.414 0"
            clipRule="evenodd"
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
export { SvgDonePrimery64 }
