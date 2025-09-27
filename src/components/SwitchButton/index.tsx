'use client'
import React, { useState } from 'react'
import styles from './SwitchButton.module.scss'
import cn from 'classnames'
import { useTranslations } from 'next-intl'

interface PropTypes {
  isActive: boolean
  isDisabled: boolean
  onToggle: (isOn: boolean) => void
  className?: string
}
const SwitchButton = ({
  onToggle,
  className,
  isActive,
  isDisabled,
}: PropTypes) => {
  const t = useTranslations('SwitchButton')
  const [isOn, setIsOn] = useState(isActive)

  const handleToggle = () => {
    setIsOn(prev => !prev)
    onToggle(!isOn)
  }
  return (
    <input
      checked={isOn}
      className={cn(styles.root, className)}
      disabled={isDisabled}
      title={isOn ? t('on') : t('off')}
      type="checkbox"
      onChange={handleToggle}
    />
  )
}

export default SwitchButton
