import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'16'}
    viewBox={'0 0 16 16'}
    width={'16'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#clip0_5928_3055)'} id={'keyboard_arrow_left'}>
      <path
        d={'M10.2733 11.06L7.21998 8L10.2733 4.94L9.33331 4L5.33331 8L9.33331 12L10.2733 11.06Z'}
        fill={'white'}
        id={'Vector'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_5928_3055'}>
        <rect fill={'white'} height={'16'} width={'16'} />
      </clipPath>
    </defs>
  </svg>
)

export const ArrowLeft = memo(SvgComponent)
