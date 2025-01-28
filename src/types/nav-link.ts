import { IconType } from 'react-icons/lib'

type NavLinkType = {
  icon: IconType
  label: string
  url?: string
  onClick?: () => void
}

export interface NavLinkProps {
  link: NavLinkType
  isActive: boolean
  onClick?: () => void
  className?: string
}
