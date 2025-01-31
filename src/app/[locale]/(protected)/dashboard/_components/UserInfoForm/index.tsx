'use client'
import React, { useCallback, useEffect } from 'react'
import styles from './UserInfoForm.module.scss'
import EditableAvatar from '../EditableAvatar'
import { useTranslations } from 'next-intl'
import cn from 'classnames'
import {
  handleUpdateUserById,
  handleValidateCode,
  handleVerifyEmail,
} from '@/actions/user'
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
import Typography from '@/components/UI/Typography'
import { BsShieldLock as OTPIcon } from 'react-icons/bs'
import { EMAIL_UPDATE_OTP } from '@/utils/constants'
import { truncateEmail } from '@/utils/string'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface PropTypes {
  userId: string
  name?: string | null
  email: string
  image?: string | null
  className?: string
}

interface OTPModalState {
  isOpen: boolean
  email?: string
}

const MAX_NUMBER_OF_EMAIL_CHARACTERS = 30

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

  const [pendingEmail, setPendingEmail] = useLocalStorage<OTPModalState>({
    key: 'otp-modal',
    defaultValue: { isOpen: false },
  })

  useEffect(() => {
    if (pendingEmail) {
      const { isOpen, email } = pendingEmail
      if (isOpen && email) handleOpenModal(email)
    }
  }, [])

  const handleOpenModal = (pendingEmail: string) => {
    setPendingEmail({ isOpen: true, email: pendingEmail })

    const handleCloseModal = () => {
      setPendingEmail(null)
      closeModal()
    }

    const handleSuccess = async () => {
      await handleUpdateSession({ email: pendingEmail })
      setPendingEmail(null)
    }

    openModal({
      className: styles.modal,
      isClosable: false,
      title: t('email_update'),
      icon: { src: OTPIcon },
      content: (
        <OTPModal
          digitsNumber={EMAIL_UPDATE_OTP.n}
          expirationTime={EMAIL_UPDATE_OTP.expirationInMinutes}
          message={t.rich('input_code', {
            em: text => (
              <Typography
                className={styles.recipient}
                tag="span"
                weight="semiBold"
              >
                {text}
              </Typography>
            ),
            recipient: truncateEmail(
              pendingEmail,
              MAX_NUMBER_OF_EMAIL_CHARACTERS
            ),
          })}
          onCancel={handleCloseModal}
          onResend={() => handleVerifyEmail(pendingEmail)}
          onSubmit={code => handleValidateCode(code)}
          onSuccess={handleSuccess}
        />
      ),
    })
  }

  // Memoize to prevent unnecessary re-renders in children components
  const handleUpdate = useCallback(
    async (updatedFields: Partial<UserAPIType>) => {
      if (!userId) {
        return notify('error', t('Account.update_failed'))
      }

      try {
        const res = await handleUpdateUserById(userId, updatedFields)
        notify('success', getSuccessMessage(res))

        return res.data // Propagate response to EditableField
      } catch (err) {
        notify(
          'error',
          (await getErrorMessage(err)) || t('Account.update_failed')
        )
        throw err // Propagate error to EditableField to prevent field update if backend error
      }
    },
    [userId, t]
  )

  const handleReset = (field: keyof UserInfoSchema, defaultValue: string) => {
    setValue(field, defaultValue)
  }

  // Refactor into custom hook
  const handleUpdateSession = async (updatedFields: Partial<UserAPIType>) => {
    await update({ ...updatedFields, lastUpdateDate: new Date() })
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
          onSuccess={newName => handleUpdateSession({ name: newName })}
        />

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
          onSuccess={newEmail => handleOpenModal(newEmail ?? '')} // Pass the new email
          /*             if (res.success) {
              // Only update `initialValue` if modal validation succeeds
              await handleUpdateSession({ email: emailValue })
            } */
        />
      </div>
    </div>
  )
}

export default UserInfoForm
