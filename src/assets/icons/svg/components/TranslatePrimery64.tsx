// @ts-nocheck
import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
type IconProps = SvgProps & {
  size?: number,
}
const SvgTranslatePrimery64 = React.memo(
  React.forwardRef(
    (
      { size, ...props }: IconProps,
      ref: React.Ref<React.ComponentRef<typeof Svg>>
    ) => {
      return React.cloneElement(
        <Svg
          fill="currentColor"
          viewBox="0 0 21 21"
          width={24}
          height={24}
          {...props}
        >
          <G
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M18.5 10.5v-6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2" />
            <Path d="M6.5 8.503h-2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h.003l6-.01a2 2 0 0 0 1.997-2V14.5m-5-1.997h-3" />
            <Path d="m9 14-1 1q-.5.5-2.5 1.5" />
            <Path d="M5.5 12.503q.501 1.75 1.5 2.499C8 15.75 8.5 16 9.5 16.5m4-12-3 6m3-6 3 6m-1-2h-4" />
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
export { SvgTranslatePrimery64 }
