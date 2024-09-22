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
      className={cn(styles.icon, { [styles.toggled]: toggled }, className)}
      data-testid="burger-menu"
      aria-label="Menu"
      role="button"
      aria-controls="navigation"
      onClick={toggleMenu}
    >
      {[1, 2, 3].map(i => (
        <div key={i} className={cn(styles.line)}></div>
      ))}
    </div>
  )
}

export default BurgerMenu
