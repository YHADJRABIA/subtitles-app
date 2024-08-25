'use client'
import React, { useState } from 'react'

import cn from 'classnames'
import styles from './DeleteAccountButton.module.scss'
import { Button } from '@/components/UI/Button'
import { useSession } from 'next-auth/react'
import { handleDeleteUserById } from '@/actions/user'
import { useModal } from '@/hooks/useModal'
import ConfirmationModal from '@/components/Modals/ConfirmationModal'
import { useTranslations } from 'next-intl'
import { notify } from '@/lib/toastify'
import { getErrorMessage } from '@/utils/errors'
import { handleLogout } from '@/actions/auth'

interface PropTypes {
  className?: string
}

const DeleteAccountButton = ({ className }: PropTypes) => {
  const { data: session, status } = useSession()

  const t = useTranslations('Dashboard.Account')
  const [isProcessing, setIsProcessing] = useState(false)

  const isLoading = status === 'loading' || isProcessing

  const { openModal, closeModal } = useModal()

  const handleOpenModal = () => {
    openModal({
      title: t('account_deletion'),
      content: (
        <ConfirmationModal
          message={t('warning_deletion')}
          onConfirm={handleDelete}
          onCancel={closeModal}
          type="warning"
        />
      ),
    })
  }

  const handleDelete = async () => {
    const userId = session?.user?.id
    if (!userId) {
      notify('error', t('deletion_failed'))
      return
    }

    setIsProcessing(true)
    try {
      const res = await handleDeleteUserById(userId)
      if (res?.data.success) {
        await handleLogout()
        notify('success', res.data.message) // TODO: persist toast after redirection
      }
    } catch (err) {
      notify('error', getErrorMessage(err) || t('deletion_failed'))
    } finally {
      setIsProcessing(false)
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
