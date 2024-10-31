import React, { useMemo } from 'react'
import Typography, { TextSize } from '@/components/UI/Typography'
import { formatDate, isToday, isYesterday } from '@/utils/date'
import { useFormatter, useTranslations } from 'next-intl'

interface PropTypes {
  date: string
  showTime?: boolean
  size?: TextSize
}

const DateDisplay = ({ date, showTime = false, size = 'xxs' }: PropTypes) => {
  /*   const t = useTranslations('DateDisplay')
  const formattedDate = formatDate(date, { showTime }) */

  const format = useFormatter()

  const dateTime = new Date(date)

  const timeAgo = format.relativeTime(dateTime)
  const timeDate = format.dateTime(dateTime, {
    hour: 'numeric',
    minute: 'numeric',
  })

  // Simplified useMemo to get dateValue
  /*   const dateValue = useMemo(() => {
    if (isToday(date)) return t('today')
    if (isYesterday(date)) return t('yesterday')
    return typeof formattedDate === 'object' ? formattedDate.date : undefined
  }, [date, formattedDate, t])

  const timeValue =
    typeof formattedDate === 'object' && showTime ? formattedDate.time : null */

  return (
    <Typography size={size} weight="semiLight">
      {timeDate}
    </Typography>
  )
}

export default DateDisplay
