import React from 'react'
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

  const timeDifference = now.getTime() - dateTime.getTime()

  const fullDate = format.dateTime(dateTime, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  let displayValue

  if (isRelativeDate || timeDifference < RELATIVE_TIME_THRESHOLD) {
    // Show relative time if less than `RELATIVE_TIME_THRESHOLD` has passed or if isRelativeDate is true
    displayValue = format.relativeTime(dateTime, now)
  } else {
    const dateValue = format.dateTime(dateTime, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    const timeValue = showTime
      ? format.dateTime(dateTime, {
          hour: 'numeric',
          minute: 'numeric',
        })
      : null

    const isDateToday = isToday(dateTime)
    const isDateYesterday = isYesterday(dateTime)

    const displayDate = isDateToday
      ? t('today')
      : isDateYesterday
        ? t('yesterday')
        : dateValue

    displayValue = t('at', { date: displayDate, time: timeValue })
  }

  return (
    <Typography size={size} title={fullDate} weight="semiLight">
      {displayValue}
    </Typography>
  )
}

export default DateDisplay
