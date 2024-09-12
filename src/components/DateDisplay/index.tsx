import React from 'react'
import Typography from '@/components/UI/Typography'
import { formatDate } from '@/utils/date'
import { useTranslations } from 'next-intl'

interface PropTypes {
  date: string
  showTime?: boolean
}

const DateDisplay = ({ date, showTime = false }: PropTypes) => {
  const t = useTranslations('DateDisplay')
  const formattedDate = formatDate(date, { showTime })

  const isObject = typeof formattedDate === 'object'
  const dateValue = isObject ? formattedDate.date : formattedDate
  const timeValue = isObject ? formattedDate.time : null

  return (
    <Typography size="xxs">
      {t('at', { date: dateValue, time: timeValue })}
      {/* TODO: Fix responsiveness */}
    </Typography>
  )
}

export default DateDisplay
