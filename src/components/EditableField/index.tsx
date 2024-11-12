'use client'
import React, { ChangeEvent, useState, useTransition } from 'react'
import cn from 'classnames'
import styles from './EditableField.module.scss'
import Typography from '@/components/UI/Typography'
import Separator from '@/components/Separator'
import { Button } from '@/components/UI/Button'
import { useTranslations } from 'next-intl'
import { getErrorMessage } from '@/utils/errors'

interface PropTypes {
  label?: string
  value: string
  onEdit: (newValue: string) => Promise<void>
  topText?: string
  className?: string
  isLoading?: boolean
}

const EditableField = ({
  className,
  label,
  value,
  onEdit,
  topText,
}: PropTypes) => {
  const t = useTranslations('EditableField')
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [isPending, startTransition] = useTransition()

  const hasValue = !!value.length
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSave = () => {
    if (inputValue !== value) {
      startTransition(async () => {
        try {
          await onEdit(inputValue)
          setIsEditing(false)
        } catch (err) {
          console.error('Saving EditableField failed:', getErrorMessage(err))
        }
      })
    } else {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setInputValue(value) // Revert to the original value
    setIsEditing(false)
  }

  const actionLabel = t(isEditing ? 'cancel' : hasValue ? 'edit' : 'add')

  const showTopText = topText?.length

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.heading, { [styles.offset]: showTopText })}>
        <Typography size="s" weight="semiBold">
          {label}
        </Typography>
        <Typography
          aria-label={actionLabel}
          className={styles.cta}
          size="xs"
          title={actionLabel}
          weight="semiLight"
          onClick={isEditing ? handleCancel : handleEdit}
        >
          {actionLabel}
        </Typography>
      </div>

      {isEditing ? (
        <div className={styles.inputContainer}>
          {/* TODO: Handle max-height fluid transition */}
          {showTopText && (
            <Typography className={styles.hint} size="xxs">
              {topText}
            </Typography>
          )}
          <input
            autoFocus
            aria-label={t('edit')}
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            aria-label={t('save')}
            disabled={isPending}
            isLoading={isPending}
            size="xs"
            variation="primary"
            onClick={handleSave}
          >
            {t('save')}
          </Button>
        </div>
      ) : (
        <Typography className={styles.value} size="s">
          {value}
        </Typography>
      )}

      <Separator className={styles.separator} />
    </div>
  )
}

export default EditableField
