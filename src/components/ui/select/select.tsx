import { useState } from 'react'

import { ArrowDown, ArrowUp } from '@/assets/icons'
import { Typography } from '@/components/ui/typography'
import * as RadixLabel from '@radix-ui/react-label'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

export default () => <RadixLabel.Root />

type SelectType = {
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  isOpen?: boolean
  label?: string
  onValueChange?: (value: string) => void
  options: string[]
  placeholder?: string
  setIsOpen?: (isOpen: boolean) => void
  value?: string
  variant?: 'common' | 'pagination'
}

export const Select = ({
  className,
  disabled = false,
  fullWidth,
  isOpen = false,
  label,
  onValueChange,
  options,
  placeholder,
  setIsOpen,
  value = '',
  variant = 'common',
}: SelectType) => {
  const [open, setOpen] = useState(isOpen)
  const onOpenChangeHandler = () => {
    if (!disabled) {
      setIsOpen ? setIsOpen(!isOpen) : setOpen(!open)
    }
  }

  const classNames = {
    content: clsx(
      s.content,
      variant === 'pagination' && s.contentPagination,
      fullWidth && s.fullWidth,
      className
    ),
    icon: clsx(s.icon, disabled && s.disabled),
    item: clsx(s.item, variant === 'pagination' && s.itemPagination, className),
    label: clsx(s.label, disabled && s.disabled),
    trigger: clsx(
      s.trigger,
      variant === 'pagination' && s.triggerPagination,
      disabled && s.disabled,
      fullWidth && s.fullWidth,
      className
    ),
    value: s.value,
  }

  return (
    <RadixLabel.Root>
      {label && (
        <Typography
          as={'label'}
          className={s.label}
          onClick={onOpenChangeHandler}
          variant={'body2'}
        >
          {label}
        </Typography>
      )}
      <RadixSelect.Root
        disabled={disabled}
        onOpenChange={onOpenChangeHandler}
        onValueChange={onValueChange}
        open={open}
        value={value}
      >
        <RadixSelect.Trigger className={classNames.trigger}>
          <Typography variant={'body1'}>
            <RadixSelect.Value className={classNames.value} placeholder={placeholder}>
              {value}
            </RadixSelect.Value>
          </Typography>
          <RadixSelect.Icon className={classNames.icon}>
            {open ? <ArrowUp size={16} /> : <ArrowDown disabled={disabled} size={16} />}
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={classNames.content} position={'popper'}>
            <RadixSelect.Viewport>
              {options.map(value => (
                <RadixSelect.Item className={classNames.item} key={value} value={value}>
                  <RadixSelect.ItemText>{value}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </RadixLabel.Root>
  )
}
