'use client'
import { useRef } from 'react'
import styles from './LanguageMenu.module.scss'
import { PiCaretDownBold as CaretIcon } from 'react-icons/pi'
import cn from 'classnames'

import Image from 'next/image'
import { Button } from '../UI/Button'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { languages } from '@/utils/internationalisation/language'
import useChangeLanguage from '@/hooks/useChangeLanguage'
import Typography from '../UI/Typography'

interface PropTypes {
  className?: string
  isInverted?: boolean
}

const LanguageMenu = ({ className, isInverted = false }: PropTypes) => {
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

  useOnClickOutside(ref, handleClose) // Closes language menu if user clicks outside of ref

  return (
    <div className={cn(styles.root, className)} ref={ref}>
      <Button
        className={styles.button}
        disabled={isPending}
        tag="span"
        onClick={onToggle}
      >
        <Image
          alt={currentLanguage.label}
          height={19}
          src={currentLanguage.icon}
          width={19}
        />
        <Typography
          uppercase
          className={styles.currentLang}
          size="xs"
          tag="span"
        >
          {currentLanguage.value}
        </Typography>
        <CaretIcon
          className={cn(styles.toggler, { verticalFlip: isOpen })}
          size={15}
        />
      </Button>

      <ul
        className={cn('hidden', {
          visible: isOpen,
          [styles.inverted]: isInverted,
        })}
      >
        {languages.map(el => {
          const isSelected = currentLanguage.value === el.value
          return (
            <li
              key={el.id}
              lang={el.value}
              title={el.label}
              onClick={() => onChangeLanguage(el.value)}
            >
              <Image
                alt={el.label}
                className={styles.flag}
                height={18}
                src={el.icon}
                width={18}
              />
              <Typography
                className={styles.label}
                size="xs"
                tag="span"
                weight={isSelected ? 'semiBold' : undefined}
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
