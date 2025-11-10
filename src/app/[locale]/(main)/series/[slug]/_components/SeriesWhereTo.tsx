import React from 'react'
import cn from 'classnames'
import styles from './SeriesWhereTo.module.scss'
import { useTranslations } from 'next-intl'
import Typography from '@/components/UI/Typography'
import { PiMapPinThin as MapMarkerIcon } from 'react-icons/pi'
import { colors } from '@/utils/color'

interface PropTypes {
  className?: string
  type: 'watch' | 'download'
  list: { label: string; href: string }[]
}

// TODO: improve UX & refactor

const SeriesWhereTo = ({ type, list, className }: PropTypes) => {
  const t = useTranslations('Series')
  if (!list.length) return

  const isWatchMode = type === 'watch'

  return (
    <section className={cn(styles.root, className)}>
      <MapMarkerIcon className={styles.icon} size={20} />
      <div className={styles.column}>
        <Typography
          className={styles.title}
          size="xs"
          tag="h3"
          weight="semiBold"
        >
          {t(isWatchMode ? 'where_to_watch' : 'where_to_download')}
        </Typography>
        {list.map((item, idx) => {
          return <Item href={item.href} key={idx} label={item.label} />
        })}
      </div>
    </section>
  )
}

export default SeriesWhereTo

const Item = ({ label, href }: { label: string; href: string }) => {
  if (!label.length || !href.length) return
  return (
    <span className={styles.item}>
      <Typography
        className={styles.link}
        color={colors.blue.secondary}
        link={{ href: href, openInNewTab: true }}
        size="xs"
      >
        {label}
      </Typography>
    </span>
  )
}
