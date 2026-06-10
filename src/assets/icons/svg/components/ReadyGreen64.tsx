// @ts-nocheck
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgReadyGreen64 = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg viewBox="0 -4 30 30" width={24} height={24} {...props}>
          <Path
            fill="currentColor"
            d="M29.443.627c.743.795.743 2.06 0 2.855L12.747 21.373a1.94 1.94 0 0 1-1.65.614 1.94 1.94 0 0 1-1.496-.624L.557 11.671a2.11 2.11 0 0 1 0-2.855 1.94 1.94 0 0 1 2.854 0l7.768 8.324L26.589.627a1.94 1.94 0 0 1 2.854 0"
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
export { SvgReadyGreen64 }
