'use client'
import React, { useState } from 'react'
import Typography, { TextSize } from '@/components/UI/Typography'
import { isToday, isYesterday } from '@/utils/date'
import { useFormatter, useNow, useTranslations } from 'next-intl'

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
  const now = useNow()
  const timeSince = now.getTime() - dateTime.getTime()

  const [isFullDateShown, setIsFullDateShown] = useState(false)

  const fullDate = format.dateTime(dateTime, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  const getDisplayValue = () => {
    if (isRelativeDate || timeSince < RELATIVE_TIME_THRESHOLD) {
      return format.relativeTime(dateTime, now)
    } else {
      const dateValue = format.dateTime(dateTime, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
      const timeValue = showTime
        ? format.dateTime(dateTime, { hour: 'numeric', minute: 'numeric' })
        : null
      const displayDate = isToday(dateTime)
        ? t('today')
        : isYesterday(dateTime)
          ? t('yesterday')
          : dateValue
      return t('at', { date: displayDate, time: timeValue })
    }
  }

  const handleShowFullDate = () => setIsFullDateShown(prev => !prev)

  return (
    <Typography
      size={size}
      title={isFullDateShown ? getDisplayValue() : fullDate} // Show alternate value as tooltip
      weight="semiLight"
      onClick={handleShowFullDate}
    >
      {isFullDateShown ? fullDate : getDisplayValue()}
    </Typography>
  )
}

export default DateDisplay
