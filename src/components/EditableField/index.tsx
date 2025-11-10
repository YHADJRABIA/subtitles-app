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
import { APIResponse } from '@/types/api'
import { colors } from '@/utils/color'

interface PropTypes<T, K extends ValidFieldNames>
  extends FieldBasePropTypes<K> {
  handleSubmit: (
    callback: (data: T) => void
  ) => FormEventHandler<HTMLFormElement>
  onEdit: (value: string) => Promise<APIResponse>
  onCancel: () => void
  onSuccess: (value?: string) => Promise<APIResponse | void> | void
  isValid?: boolean
  topText?: string
  value: string
}

const EditableField = <T, K extends ValidFieldNames & string>({
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
  onCancel,
  onSuccess,
  handleSubmit,
  value,
  ...rest
}: PropTypes<T, K>) => {
  const t = useTranslations('EditableField')

  const [isEditing, setIsEditing] = useState(false)
  const [initialValue, setInitialValue] = useState(value)
  const [isPending, startTransition] = useTransition()

  const hasValue = !!initialValue.length

  const handleEdit = () => setIsEditing(true)

  const handleSave = () => {
    startTransition(async () => {
      try {
        if (initialValue !== value) {
          const res = await onEdit(value)

          // Do not update initialValue if user action is required
          if (!res?.requiresUserAction) setInitialValue(value)

          await onSuccess(value)
        }
      } catch (err) {
        console.error('Saving EditableField failed:', getErrorMessage(err))
        onCancel()
      } finally {
        setIsEditing(false)
      }
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    onCancel()
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
            type="text"
            {...register(name, { valueAsNumber })}
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
          {initialValue}
        </Typography>
      )}

      <Separator className={styles.separator} color={colors.black.primary} />
    </div>
  )
}

export default EditableField
