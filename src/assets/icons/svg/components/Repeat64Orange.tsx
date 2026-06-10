// @ts-nocheck
import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgRepeat64Orange = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg
          fill="currentColor"
          viewBox="-1.5 0 19 19"
          width={24}
          height={24}
          {...props}
        >
          <G fill="none" fillRule="evenodd">
            <Path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 4a7 7 0 1 1-7 7"
            />
            <Path
              fill="currentColor"
              d="m6.826 7.886-5.13-3.581c-.216-.126-.26-.365-.098-.534a.5.5 0 0 1 .098-.076l5.13-3.58c.324-.19.784-.139 1.027.114A.5.5 0 0 1 8 .57v6.86c0 .314-.328.57-.734.57a.9.9 0 0 1-.44-.114"
            />
          </G>
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
export { SvgRepeat64Orange }
