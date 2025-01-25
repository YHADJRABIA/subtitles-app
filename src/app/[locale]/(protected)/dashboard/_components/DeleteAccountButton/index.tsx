'use client'
import React, { useTransition } from 'react'

import cn from 'classnames'
import styles from './DeleteAccountButton.module.scss'
import { Button } from '@/components/UI/Button'
import { handleDeleteUserById } from '@/actions/user'
import { useModal } from '@/hooks/useModal'
import ConfirmationModal from '@/components/Modals/ConfirmationModal'
import { useTranslations } from 'next-intl'
import { notify, storeNotification } from '@/lib/toastify'
import { getErrorMessage } from '@/utils/errors'
import { handleLogout } from '@/actions/auth'
import { getSuccessMessage } from '@/utils/api'
import { BsTrash as TrashBinIcon } from 'react-icons/bs'

interface PropTypes {
  className?: string
  userId: string
}

const DeleteAccountButton = ({ className, userId }: PropTypes) => {
  const t = useTranslations('Dashboard.Account')
  const [isPending, startTransition] = useTransition()

  const { openModal, closeModal } = useModal()

  const handleOpenModal = () => {
    openModal({
      title: t('account_deletion'),
      icon: { src: TrashBinIcon, size: 24 },
      content: (
        <ConfirmationModal
          message={t('warning_deletion')}
          type="warning"
          onCancel={closeModal}
          onConfirm={handleDelete}
        />
      ),
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      if (!userId) return notify('error', t('deletion_failed'))

      try {
        const res = await handleDeleteUserById(userId)
        if (res?.data.success) {
          await handleLogout()
          storeNotification({
            type: 'success',
            message: getSuccessMessage(res),
          })
        }
      } catch (err) {
        notify('error', (await getErrorMessage(err)) || t('deletion_failed'))
      }
    })
  }

  return (
    <Button
      backgroundColor="var(--primary-red-color)"
      className={cn(styles.root, className)}
      disabled={isPending}
      isLoading={isPending}
      size="xs"
      testId="delete-user-account"
      variation="primary"
      weight="semiBold"
      onClick={handleOpenModal}
    >
      {t('delete_account')}
    </Button>
  )
}

export default DeleteAccountButton
