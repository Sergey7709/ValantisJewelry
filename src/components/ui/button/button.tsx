import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react'

import { Loading } from '@/assets/icons'
import { clsx } from 'clsx'

import s from './button.module.scss'

/**
 * `ButtonPolymorph` is a polymorphic button component that can render as any HTML element type.
 * It supports several variants and can display a loading state.
 *
 * @component
 * @param {object} props - The properties that define the button.
 * @param {('primary'|'secondary'|'tertiary'|'link')} [props.variant='primary'] - The variant of the button.
 * @param {boolean} [props.fullWidth=false] - If true, the button will take up the full width of its container.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the button.
 * @param {ElementType} [props.as='button'] - The HTML element type to render as.
 * @param {boolean} props.disabled - If true, the button will be disabled.
 * @param {boolean} props.loading - If true, a loading spinner will be displayed in the button.
 * @param {ReactNode} props.children - The content to display inside the button.
 * @param {PolymorphRef<T extends ElementType>} ref - A ref to attach to the rendered element.
 * @returns {ReactNode} The rendered button component.
 */

const BUTTON_VARIANTS = {
  link: 'link',
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
} as const

type AsPolymorphProp<T extends ElementType> = {
  as?: T
}

type ElementProps = {
  fullWidth?: boolean
  loading?: boolean
  variant?: (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]
}

type PolymorphProps<T extends ElementType, ElementProps = {}> = AsPolymorphProp<T> &
  ElementProps &
  Omit<ComponentPropsWithoutRef<T>, keyof (ElementProps & AsPolymorphProp<T>)>

type PolymorphRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

type PolymorphPropRef<T extends ElementType> = { ref?: PolymorphRef<T> }

type PolymorphPropsWithRef<T extends ElementType, ElementProps = {}> = PolymorphProps<
  T,
  ElementProps
> &
  PolymorphPropRef<T>

type TagComponent = <T extends ElementType = 'button'>(
  props: PolymorphPropsWithRef<T, ElementProps>
) => ReactNode

const ButtonPolymorph: TagComponent = forwardRef(
  <T extends ElementType = 'button'>(props: PolymorphPropsWithRef<T>, ref?: PolymorphRef<T>) => {
    const {
      as: Tag = 'button',
      children,
      className = '',
      disabled,
      fullWidth,
      loading,
      variant = 'primary',
      ...rest
    } = props

    const tagClassName = clsx(
      s[variant],
      fullWidth && s.fullWidth,
      className,
      disabled && 'href' in rest && s.disabled,
      loading && s.loading
    )

    return (
      <Tag className={tagClassName} disabled={disabled} ref={ref} {...rest}>
        {loading && (
          <div className={clsx(s.loadingWrapper)}>
            <Loading />
          </div>
        )}
        <div className={s.children}>{children}</div>
      </Tag>
    )
  }
)

export const Button = ButtonPolymorph
