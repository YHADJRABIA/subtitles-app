'use client'
import React, { useState } from 'react'
import Typography, { TextSize } from '@/components/UI/Typography'
import { isYesterday } from '@/utils/date'
import { useFormatter, useNow, useTranslations } from 'next-intl'
import cn from 'classnames'
import styles from './DateDisplay.module.scss'

const RELATIVE_TIME_THRESHOLD = 24 * 60 * 60 * 1000 // 1 day in ms

interface BaseProps {
  date: string
  size?: TextSize
}

type PropTypes =
  | (BaseProps & { showTime?: true; isRelativeDate?: false })
  | (BaseProps & { showTime?: false; isRelativeDate?: true })

const DateDisplay = ({
  date,
  showTime = false,
  size = 'xxs',
  isRelativeDate = false,
}: PropTypes) => {
  const t = useTranslations('DateDisplay')
  const format = useFormatter()
  const dateTime = new Date(date)
  const now = useNow({ updateInterval: 1000 * 5 }) // Update `now` every 5 seconds
  const timeSince = now.getTime() - dateTime.getTime()

  const [isFullDateShown, setIsFullDateShown] = useState(false)

  const fullDate = format.dateTime(dateTime, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  const relativeDate = format.relativeTime(dateTime, now)

  const showRelativeDate = isRelativeDate || timeSince < RELATIVE_TIME_THRESHOLD

  const getDisplayValue = () => {
    if (showRelativeDate) {
      return relativeDate
    } else {
      const dateValue = format.dateTime(dateTime, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
      const timeValue = showTime
        ? format.dateTime(dateTime, { hour: 'numeric', minute: 'numeric' })
        : null
      const displayDate = isYesterday(dateTime) ? t('yesterday') : dateValue
      return t('at', { date: displayDate, time: timeValue })
    }
  }

  // Toggle relativeDate to full date
  const handleShowFullDate = () => {
    if (!showRelativeDate) return
    setIsFullDateShown(prev => !prev)
  }

  const shouldShowFullDateTooltip = !isFullDateShown && showRelativeDate

  return (
    <Typography
      className={cn(styles.root, { [styles.isCta]: showRelativeDate })}
      size={size}
      title={shouldShowFullDateTooltip ? fullDate : relativeDate} // / Show alternate value as tooltip
      weight="semiLight"
      onClick={handleShowFullDate}
    >
      {isFullDateShown ? fullDate : getDisplayValue()}
    </Typography>
  )
}

export default DateDisplay
