import { useNow, useTranslations } from 'next-intl'
import React from 'react'
import Typography from '../UI/Typography'
import { PORTFOLIO_LINK } from '@/utils/constants'

const Footer = () => {
  const t = useTranslations('Footer')
  const now = useNow()

  return (
    <footer>
      <Typography
        link={{ href: PORTFOLIO_LINK, openInNewTab: true }}
        size="xs"
        tag="small"
      >
        {t('copyright', { currentYear: now.getFullYear() })}
      </Typography>
    </footer>
  )
}

export default Footer
