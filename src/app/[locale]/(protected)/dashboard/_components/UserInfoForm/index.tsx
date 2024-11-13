'use client'
import React, { useCallback, useState } from 'react'
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

  // Prioritize client-side session after update, fallback to server-side session
  const username = clientSession?.user?.name || name || ''
  const userEmail = clientSession?.user?.email || email || ''

  const {
    handleSubmit,
    register,
    formState: { isValid, errors, isSubmitting },
  } = useForm<UserInfoSchema>({
    resolver: zodResolver(UserInfoValidator(t_zod)),
    delayError: 400,
    mode: 'onChange',
    defaultValues: { name: username, email: userEmail },
  })

  const [isLoading, setIsLoading] = useState(false)

  // useCallback to memoize handleUpdate to prevent unnecessary re-renders in children components
  const handleUpdate = useCallback(
    async (updatedFields: Partial<UserAPIType>) => {
      if (!userId) {
        notify('error', t('Account.update_failed'))
        return
      }

      setIsLoading(true)

      try {
        // Make the API call to update user info
        const res = await handleUpdateUserById(userId, updatedFields)

        if (res?.data.success) {
          // Notify success and update session
          notify('success', res.data.message)
          await update(updatedFields) // Update session with the updated fields
        }
      } catch (err) {
        notify(
          'error',
          (await getErrorMessage(err)) || t('Account.update_failed')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [userId, t, update] // Add dependencies for useCallback to make sure it's updated when necessary
  )

  const isDisabled = isSubmitting || !isValid

  return (
    <div className={cn(styles.root, className)}>
      <EditableAvatar className={styles.avatar} src={image} />

      <div className={styles.userInfo}>
        <EditableField
          handleSubmit={handleSubmit}
          isDisabled={isDisabled}
          isSubmitting={isSubmitting}
          isValid={isValid}
          label={t('name')}
          name="name"
          register={register}
          subLabel={{ text: errors.name?.message, isShown: !!errors.name }}
          value={username}
          onEdit={newName => handleUpdate({ name: newName })}
        />

        <EditableField
          handleSubmit={handleSubmit}
          isDisabled={isDisabled}
          isSubmitting={isSubmitting}
          isValid={isValid}
          label={t('email')}
          name="email"
          register={register}
          subLabel={{ text: errors.email?.message, isShown: !!errors.email }}
          topText={t('confirmation_email')}
          value={userEmail}
          onEdit={newEmail => handleUpdate({ email: newEmail })}
        />
      </div>
    </div>
  )
}

export default UserInfoForm
