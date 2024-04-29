import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import React, { ReactNode, useState } from 'react'

/**
 * Toggles visibility of password's value
 * size prop represents icon's size
 */

type UseShowPasswordReturnType = [string, () => ReactNode]
interface PropTypes {
  size: number
}

export const useShowPassword = ({
  size,
}: PropTypes): UseShowPasswordReturnType => {
  const [isShown, setIsShown] = useState(false)

  const handleClick = () => setIsShown(prev => !prev)

  const IconComponent = isShown ? AiOutlineEyeInvisible : AiOutlineEye

  const Icon = () => (
    <IconComponent
      onClick={handleClick}
      title={isShown ? 'Conceal password' : 'Reveal password'}
      style={{ fontSize: size, cursor: 'pointer' }}
    />
  )

  // isShown = "abcd" else ••••
  const inputType = isShown ? 'text' : 'password'

  return [inputType, Icon]
}
