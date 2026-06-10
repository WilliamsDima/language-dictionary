// @ts-nocheck
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgDotsVerticalWhite64 = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 16 16"
          width={24}
          height={24}
          {...props}
        >
          <Path
            fill="currentColor"
            d="M8 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm2-4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
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
export { SvgDotsVerticalWhite64 }
