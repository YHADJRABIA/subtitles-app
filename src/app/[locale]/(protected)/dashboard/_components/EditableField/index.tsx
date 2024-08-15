'use client'
import React, { useState } from 'react'
import cn from 'classnames'
import styles from './EditableField.module.scss'
import Typography from '@/components/UI/Typography'
import {
  MdOutlineEdit as PenIcon,
  MdAdd as AddIcon,
  MdSave as SaveIcon,
  MdCancel as CancelIcon,
} from 'react-icons/md'
import { useTranslations } from 'next-intl'
import Separator from '@/components/Separator'
import { Button } from '@/components/UI/Button'

interface PropTypes {
  label?: string
  value: string
  onValidate: (newValue: string) => void
  className?: string
}

// TODO: finish development
const EditableField = ({ className, label, value, onValidate }: PropTypes) => {
  const t = useTranslations('EditableField')
  const hasValue = !!value.length
  const CtaIcon = hasValue ? PenIcon : AddIcon

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const handleIconClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSave = () => {
    if (inputValue !== value) {
      onValidate(inputValue)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setInputValue(value) // Revert to the original value
    setIsEditing(false)
  }

  return (
    <div className={cn(styles.root, className)}>
      <Typography size="s" weight="semiBold" className={styles.label}>
        {label}
      </Typography>
      {/*       {isEditing ? (
        <div className={styles.editingContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className={styles.input}
            autoFocus
            aria-label={t('editField')}
          />

          <div className={styles.ctaSection}>
            <Button
              onClick={handleSave}
              className={styles.saveButton}
              aria-label={t('save')}
            >
              {t('save')}
            </Button>
            <Button
              onClick={handleCancel}
              className={styles.cancelButton}
              aria-label={t('cancel')}
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      ) : ( */}
      <Typography size="s" className={styles.value}>
        {value}
      </Typography>
      {/*   )}
      {!isEditing && (
        <CtaIcon
          size={18}
          className={styles.ctaIcon}
          title={t(hasValue ? 'edit' : 'add')}
          onClick={handleIconClick}
          aria-label={t(hasValue ? 'edit' : 'add')}
        />
      )} */}
      <Separator className={styles.separator} />
    </div>
  )
}

export default EditableField
