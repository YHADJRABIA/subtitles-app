import { useNow, useTranslations } from 'next-intl'
import React from 'react'
import Typography from '../UI/Typography'
import { PORTFOLIO_LINK } from '@/utils/constants'

const Footer = () => {
  const t = useTranslations('Footer')
  const now = useNow()
  const currentYear = now.getFullYear()

  return (
    <footer>
      <Typography
        link={{ href: PORTFOLIO_LINK, openInNewTab: true }}
        size="xs"
        tag="small"
      >
        {t('copyright', { currentYear })}
        {/* TODO: Update as of 2025 to display as 2024-currentYear */}
      </Typography>
    </footer>
  )
}

export default Footer
