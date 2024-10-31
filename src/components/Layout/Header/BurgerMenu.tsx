import { SetStateAction, Dispatch } from 'react'
import cn from 'classnames'
import styles from './BurgerMenu.module.scss'
import { useEventListener } from '@/hooks/useEventListener'
import useLockBodyScroll from '@/hooks/useLockBodyScroll'

interface PropTypes {
  toggled: boolean
  setToggled: Dispatch<SetStateAction<boolean>>
  className?: string
}

const BurgerMenu = ({ toggled, setToggled, className }: PropTypes) => {
  // On/Off menu button
  const toggleMenu = (): void => setToggled(prev => !prev)

  // Prevent scroll when menu is opened
  useLockBodyScroll(toggled)

  // Closes menu if escape key pressed
  const keyboardHandler = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') setToggled(false)
  }

  useEventListener('keydown', keyboardHandler)

  return (
    <div
      aria-controls="navigation"
      aria-label="Menu"
      className={cn(styles.icon, { [styles.toggled]: toggled }, className)}
      data-testid="burger-menu"
      role="button"
      onClick={toggleMenu}
    >
      {[1, 2, 3].map(i => (
        <div className={cn(styles.line)} key={i}></div>
      ))}
    </div>
  )
}

export default BurgerMenu
