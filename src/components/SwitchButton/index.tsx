'use client'
import React, { useState, useTransition } from 'react'
import styles from './SwitchButton.module.scss'
import cn from 'classnames'
import { useTranslations } from 'next-intl'

interface PropTypes {
  isActive: boolean
  onToggle: () => void
  className?: string
}
const SwitchButton = ({ onToggle, className, isActive }: PropTypes) => {
  const t = useTranslations('SwitchButton')
  const [isPending, startTransition] = useTransition()
  const [isOn, setIsOn] = useState(isActive)

  const handleToggle = () => {
    startTransition(() => {
      setIsOn(prev => !prev)
      onToggle()
    })
  }
  return (
    <div
      className={cn(styles.root, className)}
      title={t('toggle')}
      onClick={handleToggle}
    >
      <input
        checked={isOn}
        className={styles.toggler}
        disabled={isPending}
        type="checkbox"
      />
    </div>
  )
}

export default SwitchButton
