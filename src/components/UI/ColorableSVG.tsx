import React, { SVGProps } from 'react'

interface PropTypes extends SVGProps<SVGSVGElement> {
  href: string
  title?: string | undefined
  mainColor?: string
}

const ColorableSVG = ({ href, mainColor, title, ...rest }: PropTypes) => {
  return (
    <svg {...rest}>
      {title ? <title>{title}</title> : null}
      <use href={`${href}#root`} style={{ color: mainColor }} />
    </svg>
  )
}
export default ColorableSVG
