import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={12}
    ref={ref}
    width={12}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M9.77 7.257a.5.5 0 0 1-.82.385l-2.68-2.24-2.684 2.16a.5.5 0 0 1-.705-.075.5.5 0 0 1 .075-.73l3-2.415a.5.5 0 0 1 .635 0l3 2.5a.5.5 0 0 1 .18.415Z'
        }
        fill={'#fff'}
        stroke={'#fff'}
        strokeWidth={'1'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h12v12H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const ChevronUp = memo(ForwardRef)
