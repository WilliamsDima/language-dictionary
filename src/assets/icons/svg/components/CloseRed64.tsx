// @ts-nocheck
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgCloseRed64 = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 32 32"
          width={24}
          height={24}
          {...props}
        >
          <Path
            d="m7 7 18 18M7 25 25 7"
            style={{
              fill: 'none',
              stroke: 'red',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 3.2,
            }}
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
export { SvgCloseRed64 }
