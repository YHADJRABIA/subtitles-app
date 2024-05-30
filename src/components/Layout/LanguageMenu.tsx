'use client'

import { useRef } from 'react'
import styles from './LanguageMenu.module.scss'
import { PiCaretDownBold as CaretIcon } from 'react-icons/pi'
import cn from 'classnames'

import Image from 'next/image'
import Button from '../UI/Button'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { languages } from '@/utils/language'
import useChangeLanguage from '@/hooks/useChangeLanguage'

interface PropTypes {
  className?: string
}

const LanguageMenu = ({ className }: PropTypes) => {
  const ref = useRef(null)
  const onToggle = () => setIsOpen(prev => !prev)

  const {
    isOpen,
    setIsOpen,
    handleClose,
    currentLanguage,
    onChangeLanguage,
    isPending,
  } = useChangeLanguage()

  useOnClickOutside(ref, handleClose) // Closes language menu if user clicks outside of it

  return (
    <div ref={ref} className={cn(styles.root, className)}>
      <Button onClick={onToggle} disabled={isPending} className={styles.button}>
        <Image
          src={currentLanguage.icon}
          width={19}
          height={19}
          alt={currentLanguage.label}
          className={styles.flag}
        />
        <span className={styles.label}>{currentLanguage.value}</span>
        <CaretIcon
          size={15}
          className={cn(styles.toggler, { verticalFlip: isOpen })}
        />
      </Button>

      <ul className={cn('hidden', { visible: isOpen })}>
        {languages.map(el => (
          <li
            key={el.id}
            lang={el.value}
            onClick={() => onChangeLanguage(el.value)}
          >
            <Image
              src={el.icon}
              width={18}
              height={18}
              alt={el.label}
              className={styles.flag}
            />
            <span className={styles.label}>{el.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageMenu
