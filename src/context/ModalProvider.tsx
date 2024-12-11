'use client'
import Modal from '@/components/Modals/Modal'
import { IconType } from '@/types/icon'

import React, { createContext, useState, ReactNode } from 'react'

interface PropTypes {
  title?: string
  content: ReactNode
  isClosable?: boolean
  className?: string
  icon?: IconType
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
  const [isClosable, setIsClosable] = useState(true)

  const [className, setClassName] = useState<string | undefined>(undefined)
  const [icon, setIcon] = useState<IconType | undefined>(undefined)

  const openModal = ({
    content,
    title,
    isClosable = true,
    className,
    icon,
  }: PropTypes) => {
    setModalContent(content)
    setModalTitle(title)
    setIsOpen(true)
    setIsClosable(isClosable)
    setClassName(className)
    setIcon(icon)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
    setModalTitle(undefined)
    setClassName(undefined)
    setIcon(undefined)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        className={className}
        icon={icon}
        isClosable={isClosable}
        isOpen={isOpen}
        title={modalTitle}
        onClose={closeModal}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}
