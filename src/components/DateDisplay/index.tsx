import React from 'react'
import Typography, { TextSize } from '@/components/UI/Typography'
import { formatDate } from '@/utils/date'
import { useTranslations } from 'next-intl'

interface PropTypes {
  date: string
  showTime?: boolean
  size?: TextSize
}

const DateDisplay = ({ date, showTime = false, size = 'xxs' }: PropTypes) => {
  const t = useTranslations('DateDisplay')
  const formattedDate = formatDate(date, { showTime })

  const isObject = typeof formattedDate === 'object'
  const dateValue = isObject ? formattedDate.date : formattedDate
  const timeValue = isObject ? formattedDate.time : null

  return (
    <Typography size={size} weight="semiLight">
      {t('at', { date: dateValue, time: timeValue })}
    </Typography>
  )
}

export default DateDisplay
