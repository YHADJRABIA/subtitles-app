import React, { useMemo } from 'react'
import Typography, { TextSize } from '@/components/UI/Typography'
import { formatDate, isToday, isYesterday } from '@/utils/date'
import { useTranslations } from 'next-intl'

interface PropTypes {
  date: string
  showTime?: boolean
  size?: TextSize
}

const DateDisplay = ({ date, showTime = false, size = 'xxs' }: PropTypes) => {
  const t = useTranslations('DateDisplay')
  const formattedDate = formatDate(date, { showTime })

  // Simplified useMemo to get dateValue
  const dateValue = useMemo(() => {
    if (isToday(date)) return t('today')
    if (isYesterday(date)) return t('yesterday')
    return typeof formattedDate === 'object' ? formattedDate.date : undefined
  }, [date, formattedDate, t])

  const timeValue =
    typeof formattedDate === 'object' && showTime ? formattedDate.time : null

  return (
    <Typography size={size} weight="semiLight">
      {t('at', { date: dateValue, time: timeValue })}
    </Typography>
  )
}

export default DateDisplay
