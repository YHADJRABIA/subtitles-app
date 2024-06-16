'use client'

import { useRef } from 'react'
import styles from './LanguageMenu.module.scss'
import { PiCaretDownBold as CaretIcon } from 'react-icons/pi'
import cn from 'classnames'

import Image from 'next/image'
import Button from '../UI/Button'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { languages } from '@/utils/internationalization/language'
import useChangeLanguage from '@/hooks/useChangeLanguage'
import Typography from '../UI/Typography'

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
        {languages.map(el => {
          const isSelected = currentLanguage.value === el.value
          return (
            <li
              key={el.id}
              lang={el.value}
              onClick={() => onChangeLanguage(el.value)}
              title={el.label}
            >
              <Image
                src={el.icon}
                width={18}
                height={18}
                alt={el.label}
                className={styles.flag}
              />
              <Typography
                tag="span"
                weight={isSelected ? 'semiBold' : undefined}
                className={styles.label}
              >
                {el.label}
              </Typography>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LanguageMenu
