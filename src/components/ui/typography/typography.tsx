import { ComponentPropsWithRef, ElementType, ReactNode, Ref, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  children?: ReactNode
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithRef<T>

export const Typography = forwardRef(
  <T extends ElementType = 'span'>(
    { as, children, className, variant = 'body1', ...rest }: TypographyProps<T>,
    ref: Ref<T>
  ) => {
    const Component = as ?? 'span'

    const classes = clsx(s[variant], className)

    return (
      <Component className={classes} ref={ref} {...rest}>
        {children}
      </Component>
    )
  }
)
