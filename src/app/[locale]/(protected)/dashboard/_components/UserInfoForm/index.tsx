'use client'
import React, { useCallback } from 'react'
import styles from './UserInfoForm.module.scss'
import EditableAvatar from '../EditableAvatar'
import { useTranslations } from 'next-intl'
import cn from 'classnames'
import { handleUpdateUserById } from '@/actions/user'
import { notify } from '@/lib/toastify'
import { getErrorMessage } from '@/utils/errors'
import { useSession } from 'next-auth/react'
import EditableField from '@/components/EditableField'
import { UserAPIType } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UserInfoSchema, UserInfoValidator } from '@/types/schemas/dashboard'
import { getSuccessMessage } from '@/utils/api'
import { useModal } from '@/hooks/useModal'
import OTPModal from '@/components/Modals/OTPModal'

interface PropTypes {
  userId: string
  name?: string | null
  email: string
  image?: string | null
  className?: string
}

const UserInfoForm = ({ userId, name, email, image, className }: PropTypes) => {
  const [t, t_zod] = [useTranslations('Dashboard'), useTranslations('Zod')]
  const { data: clientSession, update } = useSession()
  // Prioritise client-side session after update, fallback to server-side session
  const defaultName = clientSession?.user?.name || name || ''
  const defaultEmail = clientSession?.user?.email || email || ''

  const { openModal, closeModal } = useModal()

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
  } = useForm<UserInfoSchema>({
    resolver: zodResolver(UserInfoValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
    defaultValues: { name: defaultName, email: defaultEmail },
  })

  const [nameValue, emailValue] = watch(['name', 'email']) // If not set, form inputs with more than 1 character will be delayed

  // Memoize to prevent unnecessary re-renders in children components
  const handleUpdate = useCallback(
    async (updatedFields: Partial<UserAPIType>) => {
      if (!userId) {
        notify('error', t('Account.update_failed'))
        return
      }

      const isEmailUpdate = !!updatedFields.email

      try {
        const res = await handleUpdateUserById(userId, updatedFields)

        if (res?.data.success) {
          // Notify success and update session
          if (!isEmailUpdate) {
            await update(updatedFields)
            notify('success', getSuccessMessage(res))
            return res // Propagate response to EditableField
          }

          // TODO: improve response data type
        }
      } catch (err) {
        notify(
          'error',
          (await getErrorMessage(err)) || t('Account.update_failed')
        )
        throw err // Propagate error to EditableField to prevent field update if backend error
      }
    },
    [userId, t, update]
  )

  watch()

  const handleReset = (field: keyof UserInfoSchema, defaultValue: string) => {
    setValue(field, defaultValue)
  }

  return (
    <div className={cn(styles.root, className)}>
      <EditableAvatar className={styles.avatar} src={image} />

      <div className={styles.userInfo}>
        <EditableField
          handleSubmit={handleSubmit}
          isValid={!errors.name}
          label={t('name')}
          name="name"
          register={register}
          subLabel={{ text: errors.name?.message, isShown: !!errors.name }}
          testId="update-user-name"
          value={nameValue!}
          onCancel={() => handleReset('name', defaultName)}
          onEdit={newName => handleUpdate({ name: newName })}
        />

        {/* TODO: Add 4-digit code modal to confirm email according to backend route */}

        <EditableField
          handleSubmit={handleSubmit}
          isValid={!errors.email}
          label={t('email')}
          name="email"
          register={register}
          subLabel={{ text: errors.email?.message, isShown: !!errors.email }}
          testId="update-user-email"
          topText={t('confirmation_email')}
          value={emailValue!}
          onCancel={() => handleReset('email', defaultEmail)}
          onEdit={newEmail => handleUpdate({ email: newEmail })}
        />
      </div>
    </div>
  )
}

export default UserInfoForm
