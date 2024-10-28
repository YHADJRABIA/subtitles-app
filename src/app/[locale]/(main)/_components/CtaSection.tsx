import { LinkButton } from '@/components/UI/Button/LinkButton'
import React from 'react'
import cn from 'classnames'
import styles from './CtaSection.module.scss'
import { useTranslations } from 'next-intl'
import { SUPPORT_LINK } from '@/utils/constants'

interface PropTypes {
  className?: string
}

// TODO: refactor
const CtaSection = ({ className }: PropTypes) => {
  const t = useTranslations('Index.Cta')

  return (
    <section className={cn(styles.root, className)}>
      <LinkButton
        link={{ href: '/series/patrul' }} // Todo: change to /series when page is finished
        size="xs"
        variation="primary"
        weight="semiBold"
      >
        {t('browse_series')}
      </LinkButton>
      <LinkButton
        link={{ href: SUPPORT_LINK, openInNewTab: true }}
        size="xs"
        variation="secondary"
      >
        {t('support_me')}
      </LinkButton>
    </section>
  )
}

export default CtaSection
