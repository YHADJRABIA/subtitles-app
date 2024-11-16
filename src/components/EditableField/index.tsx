'use client'
import React, { FormEventHandler, useState, useTransition } from 'react'
import cn from 'classnames'
import styles from './EditableField.module.scss'
import Typography from '@/components/UI/Typography'
import Separator from '@/components/Separator'
import { Button } from '@/components/UI/Button'
import { useTranslations } from 'next-intl'
import { getErrorMessage } from '@/utils/errors'
import Subfield from '../Forms/Subfield'

import { ValidFieldNames } from '@/types/schemas/general'
import { FieldBasePropTypes } from '@/types/field'

interface PropTypes<T, K extends ValidFieldNames>
  extends FieldBasePropTypes<K> {
  handleSubmit: (
    callback: (data: T) => void
  ) => FormEventHandler<HTMLFormElement>
  onEdit: (newValue: string) => Promise<void>
  isValid?: boolean
  topText?: string
  value: string
}

const EditableField = <T, K extends ValidFieldNames & string>({
  value,
  register,
  topText,
  valueAsNumber,
  label,
  subLabel,
  testId,
  isValid,
  name,
  className,
  onEdit,
  handleSubmit,
  ...rest
}: PropTypes<T, K>) => {
  const t = useTranslations('EditableField')

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [isPending, startTransition] = useTransition()

  const hasValue = !!value.length
  const handleEdit = () => setIsEditing(true)

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
    setInputValue(value) // Reset on cancel
    setIsEditing(false)
  }

  const actionLabel = t(isEditing ? 'cancel' : hasValue ? 'edit' : 'add')

  const showTopText = topText?.length
  const { text, isShown = true } = subLabel || {}

  const isShownSubfield = isShown && !!text

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
        <form
          noValidate
          className={styles.inputContainer}
          method="PATCH"
          onSubmit={handleSubmit(handleSave)}
        >
          {/* TODO: Handle max-height fluid transition */}
          {showTopText && (
            <Typography className={styles.hint} size="xs">
              {topText}
            </Typography>
          )}

          <input
            {...rest}
            autoFocus
            aria-label={t('edit')}
            className={styles.input}
            data-testid={testId}
            {...register(name, { valueAsNumber })} // TODO: fix real-time validation
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          {subLabel && (
            <Subfield
              isError
              className={styles.subField}
              isShown={isShownSubfield}
              label={text}
            />
          )}
          <Button
            aria-label={t('save')}
            disabled={!isValid}
            isLoading={isPending}
            size="xs"
            type="submit"
            variation="primary"
          >
            {t('save')}
          </Button>
        </form>
      ) : (
        <Typography className={styles.value} size="s">
          {inputValue}
        </Typography>
      )}

      <Separator className={styles.separator} />
    </div>
  )
}

export default EditableField
