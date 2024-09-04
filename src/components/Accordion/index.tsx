'use client'
import React, { ReactNode, useRef, useState } from 'react'
import styles from './Accordion.module.scss'
import { PiCaretDownBold as CaretIcon } from 'react-icons/pi'
import cn from 'classnames'
import Typography, { TagType } from '../UI/Typography'

type ItemType = {
  title: string
  body?: string | ReactNode
  backgroundColor?: string
  titleTag?: TagType
  bodyTag?: TagType
  hasBackgroundEffect?: boolean
}

interface BaseProps {
  className?: string
  expandMultiple?: boolean
  backgroundColor?: string
  titleTag?: TagType
  bodyTag?: TagType
  hasBackgroundEffect?: boolean
}

interface ItemsProps extends BaseProps {
  items: ItemType[]
  title?: never
  body?: never
}

interface BodyProps extends BaseProps {
  title: string
  body: ReactNode
  items?: never
}

type PropTypes = ItemsProps | BodyProps

const Accordion = ({
  className,
  items,
  body,
  title,
  expandMultiple = false,
  backgroundColor,
  hasBackgroundEffect = false,
  titleTag,
  bodyTag,
}: PropTypes) => {
  const [openStates, setOpenStates] = useState<boolean[]>(
    items ? items.map(() => false) : [false]
  )

  // TODO: internationalise or edit structure
  if (items && body) {
    throw new Error(
      "Accordion cannot have both 'items' and 'body' at the same time."
    )
  }

  // Filter out items with empty title or body
  const validItems = items?.filter(item => item.title && item.body) || []

  const handleToggle = (index: number) => {
    setOpenStates(prevStates =>
      prevStates.map((isOpen, idx) =>
        expandMultiple
          ? idx === index
            ? !isOpen
            : isOpen
          : idx === index
            ? !isOpen
            : false
      )
    )
  }

  return (
    <ul className={cn(styles.root, className)}>
      {validItems.length
        ? validItems.map((item, idx) => (
            <AccordionItem
              key={idx}
              {...item}
              isOpen={openStates[idx]}
              titleTag={titleTag}
              bodyTag={bodyTag}
              backgroundColor={backgroundColor}
              onToggle={() => handleToggle(idx)}
              hasBackgroundEffect={hasBackgroundEffect}
            />
          ))
        : title &&
          body && (
            <AccordionItem
              title={title}
              body={body}
              isOpen={openStates[0]}
              titleTag={titleTag}
              backgroundColor={backgroundColor}
              onToggle={() => handleToggle(0)}
              hasBackgroundEffect={hasBackgroundEffect}
              isSingleItem
            />
          )}
    </ul>
  )
}

export default Accordion

interface AccordionItemTypes extends ItemType {
  isOpen: boolean
  onToggle: () => void
  isSingleItem?: boolean
}

const AccordionItem = ({
  title,
  body,
  backgroundColor,
  titleTag = 'h3',
  bodyTag = 'h4',
  isOpen,
  onToggle,
  isSingleItem = false,
  hasBackgroundEffect,
}: AccordionItemTypes) => {
  const contentHeight = useRef<HTMLDivElement | null>(null)

  return (
    <li
      style={{ backgroundColor }}
      className={cn(styles.item, {
        [styles.coloredBackground]: hasBackgroundEffect && isOpen,
        [styles.hoverEffect]: hasBackgroundEffect,
      })}
    >
      <span className={styles.titleContainer} onClick={onToggle}>
        <Typography
          tag={titleTag}
          size="m"
          weight="semiBold"
          className={styles.title}
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
        className={styles.collapseable}
        style={{
          maxHeight: isOpen ? `${contentHeight.current?.scrollHeight}px` : '0',
        }}
      >
        {isSingleItem ? (
          body // Render body as-is for single title-body pair
        ) : (
          <Typography
            tag={bodyTag}
            size="s"
            weight="semiLight"
            className={styles.description}
          >
            {body}
          </Typography>
        )}
      </div>
    </li>
  )
}
