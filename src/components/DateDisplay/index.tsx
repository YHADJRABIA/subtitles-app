import React from 'react'
import Typography, { TextSize } from '@/components/UI/Typography'
import { isToday, isYesterday } from '@/utils/date'
import { useFormatter, useTranslations } from 'next-intl'

interface PropTypes {
  date: string
  showTime?: boolean
  size?: TextSize
}

const DateDisplay = ({ date, showTime = false, size = 'xxs' }: PropTypes) => {
  const t = useTranslations('DateDisplay')
  const format = useFormatter()

  const dateTime = new Date(date)

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

  let displayValue: string

  // Determine the display value based on date checks
  if (isDateToday) {
    displayValue = t('at', { date: t('today'), time: timeValue })
  } else if (isDateYesterday) {
    displayValue = t('at', { date: t('yesterday'), time: timeValue })
  } else {
    // Neither today nor yesterday
    displayValue = t('at', { date: dateValue, time: timeValue })
  }

  // TODO: Add relativeTime option prop

  return (
    <Typography size={size} weight="semiLight">
      {displayValue}
    </Typography>
  )
}

export default DateDisplay
