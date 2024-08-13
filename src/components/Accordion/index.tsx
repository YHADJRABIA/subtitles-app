'use client'
import React, { useRef, useState } from 'react'
import styles from './Accordion.module.scss'
import { PiCaretDownBold as CaretIcon } from 'react-icons/pi'
import cn from 'classnames'
import Typography, { TagType } from '../UI/Typography'

type ItemType = {
  title: string
  body: string
  backgroundColor?: string
  titleTag?: TagType
  bodyTag?: TagType
}

interface PropTypes {
  items: ItemType[]
  className?: string
  expandMultiple?: boolean
  backgroundColor?: string
  titleTag?: TagType
  bodyTag?: TagType
}

const Accordion = ({
  className,
  items,
  expandMultiple = true,
  backgroundColor,
  titleTag,
  bodyTag,
}: PropTypes) => {
  // Index of opened item(s)
  const [openStates, setOpenStates] = useState<boolean[]>(
    items.map(() => false)
  )

  const handleToggle = (index: number) => {
    setOpenStates(prevStates =>
      expandMultiple
        ? prevStates.map((isOpen, idx) => (idx === index ? !isOpen : isOpen))
        : prevStates.map((_, idx) => idx === index)
    )
  }

  return (
    <ul className={cn(styles.root, className)}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          {...item}
          isOpen={openStates[idx]}
          titleTag={titleTag}
          bodyTag={bodyTag}
          backgroundColor={backgroundColor}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </ul>
  )
}

export default Accordion

interface AccordionItemTypes extends ItemType {
  isOpen: boolean
  onToggle: () => void
}

const AccordionItem = ({
  title,
  body,
  backgroundColor = 'var(--primary-gray-color)',
  titleTag = 'h3',
  bodyTag = 'h4',
  isOpen,
  onToggle,
}: AccordionItemTypes) => {
  const contentHeight = useRef<HTMLDivElement | null>(null)

  return (
    <li className={styles.item} style={{ backgroundColor }}>
      <span
        className={cn(styles.titleContainer, { [styles.isExpanded]: isOpen })}
        onClick={onToggle}
      >
        <Typography
          tag={titleTag}
          size="m"
          weight="semiBold"
          className={styles.title}
          align="left"
        >
          {title}
        </Typography>
        <CaretIcon
          size={16}
          className={cn(styles.toggler, { verticalFlip: isOpen })}
        />
      </span>
      <div
        ref={contentHeight}
        className={cn(styles.collapseable, { [styles.open]: isOpen })}
        style={{
          maxHeight: isOpen ? `${contentHeight.current?.scrollHeight}px` : '0',
        }}
      >
        <Typography
          tag={bodyTag}
          size="s"
          align="left"
          weight="semiLight"
          className={styles.description}
        >
          {body}
        </Typography>
      </div>
    </li>
  )
}
