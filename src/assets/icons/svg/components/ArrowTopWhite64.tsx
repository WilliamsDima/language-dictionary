// @ts-nocheck
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgArrowTopWhite64 = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          width={24}
          height={24}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 18V2m0 0 7 7m-7-7L3 9"
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
export { SvgArrowTopWhite64 }
