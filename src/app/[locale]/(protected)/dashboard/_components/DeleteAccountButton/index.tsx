'use client'
import React, { useState } from 'react'

import cn from 'classnames'
import styles from './DeleteAccountButton.module.scss'
import { Button } from '@/components/UI/Button'
import { handleDeleteUserById } from '@/actions/user'
import { useModal } from '@/hooks/useModal'
import ConfirmationModal from '@/components/Modals/ConfirmationModal'
import { useTranslations } from 'next-intl'
import { notify } from '@/lib/toastify'
import { getErrorMessage } from '@/utils/errors'
import { handleLogout } from '@/actions/auth'

interface PropTypes {
  className?: string
  userId: string
}

const DeleteAccountButton = ({ className, userId }: PropTypes) => {
  const t = useTranslations('Dashboard.Account')
  const [isLoading, setIsLoading] = useState(false)

  const { openModal, closeModal } = useModal()

  const handleOpenModal = () => {
    openModal({
      title: t('account_deletion'),
      content: (
        <ConfirmationModal
          message={t('warning_deletion')}
          type="warning"
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      ),
    })
  }

  const handleDelete = async () => {
    if (!userId) {
      notify('error', t('deletion_failed'))
      return
    }

    setIsLoading(true)
    try {
      const res = await handleDeleteUserById(userId)
      if (res?.data.success) {
        await handleLogout()
        notify('success', res.data.message) // TODO: persist toast after redirection
      }
    } catch (err) {
      notify('error', (await getErrorMessage(err)) || t('deletion_failed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className={cn(styles.root, className)}
      variation="primary"
      backgroundColor="var(--primary-red-color)"
      disabled={isLoading}
      isLoading={isLoading}
      weight="semiBold"
      size="xs"
      onClick={handleOpenModal}
    >
      {t('delete_account')}
    </Button>
  )
}

export default DeleteAccountButton
