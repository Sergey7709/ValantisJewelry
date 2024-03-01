import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (
  props: SVGProps<SVGSVGElement> & { disabled?: boolean; size?: number },
  ref: Ref<SVGSVGElement>
) => (
  <svg
    fill={'none'}
    height={props.size || 36}
    ref={ref}
    viewBox={'0 0 512 512'}
    width={props.size || 36}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM382.6 254.6c-12.5 12.5-32.75 12.5-45.25 0L288 205.3V384c0 17.69-14.33 32-32 32s-32-14.31-32-32V205.3L174.6 254.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l103.1-103.1C241.3 97.4 251.1 96 256 96c4.881 0 14.65 1.391 22.65 9.398l103.1 103.1C395.1 221.9 395.1 242.1 382.6 254.6z'
      }
      fill={props.disabled ? props.fill : '#3da5e6'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)