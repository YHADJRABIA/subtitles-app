'use client'
import React, { ChangeEvent, useState } from 'react'
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
  className?: string
}

const EditableField = ({ className, label, value, onEdit }: PropTypes) => {
  const t = useTranslations('EditableField')
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)

  const hasValue = !!value.length
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSave = async () => {
    if (inputValue !== value) {
      setIsSaving(true)
      try {
        await onEdit(inputValue) // Call the passed update function
        setIsSaving(false)
        setIsEditing(false)
      } catch (err) {
        console.error('Saving EditableField failed:', getErrorMessage(err))
        setIsSaving(false)
      }
    } else {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setInputValue(value) // Revert to the original value
    setIsEditing(false)
  }

  const actionLabel = t(isEditing ? 'cancel' : hasValue ? 'edit' : 'add')

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.heading}>
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
            disabled={isSaving}
            isLoading={isSaving}
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
