import React from 'react'
import Typography, { TextSize } from '@/components/UI/Typography'
import { isToday, isYesterday } from '@/utils/date'
import { useFormatter, useTranslations } from 'next-intl'

interface PropTypes {
  date: string
  showTime?: boolean
  size?: TextSize
  isRelativeDate?: boolean
}

const DateDisplay = ({
  date,
  showTime = false,
  size = 'xxs',
  isRelativeDate = false,
}: PropTypes) => {
  const t = useTranslations('DateDisplay')
  const format = useFormatter()

  const dateTime = new Date(date)

  let displayValue

  if (isRelativeDate) {
    displayValue = format.relativeTime(dateTime, new Date())
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
    <Typography size={size} weight="semiLight">
      {displayValue}
    </Typography>
  )
}

export default DateDisplay
