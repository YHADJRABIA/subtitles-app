import { getCurrentYear } from '@/utils/date'
import { useTranslations } from 'next-intl'
import React from 'react'
import Typography from '../UI/Typography'
import { PORTFOLIO_LINK } from '@/utils/constants'

const Footer = () => {
  const t = useTranslations('Footer')
  return (
    <footer>
      <Typography
        tag="small"
        link={{ href: PORTFOLIO_LINK, openInNewTab: true }}
        size="xs"
      >
        &copy;{getCurrentYear()} – {t('name')}
      </Typography>
    </footer>
  )
}

export default Footer
