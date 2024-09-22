'use client'
import Modal from '@/components/Modals/Modal'
import React, { createContext, useState, ReactNode } from 'react'

interface PropTypes {
  title?: string
  content: ReactNode
}

interface ModalContextType {
  openModal: (props: PropTypes) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode>(null)
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined)

  const openModal = ({ content, title }: PropTypes) => {
    setModalContent(content)
    setModalTitle(title)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
    setModalTitle(undefined)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} title={modalTitle} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}
