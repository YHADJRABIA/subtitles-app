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

  const isDateToday = isToday(dateTime)
  const isDateYesterday = isYesterday(dateTime)

  let displayValue: string

  if (isDateToday) {
    displayValue = t('today')
  } else if (isDateYesterday) {
    displayValue = t('yesterday')
  } else {
    // Format the date with or without time based on the showTime prop
    displayValue = format.dateTime(dateTime, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(showTime && { hour: 'numeric', minute: 'numeric' }),
    })
  }

  return (
    <Typography size={size} weight="semiLight">
      {displayValue}
    </Typography>
  )
}

export default DateDisplay
