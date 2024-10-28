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
              backgroundColor={backgroundColor}
              bodyTag={bodyTag}
              hasBackgroundEffect={hasBackgroundEffect}
              isOpen={openStates[idx]}
              titleTag={titleTag}
              onToggle={() => handleToggle(idx)}
            />
          ))
        : title &&
          body && (
            <AccordionItem
              isSingleItem
              backgroundColor={backgroundColor}
              body={body}
              hasBackgroundEffect={hasBackgroundEffect}
              isOpen={openStates[0]}
              title={title}
              titleTag={titleTag}
              onToggle={() => handleToggle(0)}
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
      className={cn(styles.item, {
        [styles.coloredBackground]: hasBackgroundEffect && isOpen,
        [styles.hoverEffect]: hasBackgroundEffect,
      })}
      style={{ backgroundColor }}
    >
      <span className={styles.titleContainer} onClick={onToggle}>
        <Typography
          className={styles.title}
          size="m"
          tag={titleTag}
          weight="semiBold"
        >
          {title}
        </Typography>
        <CaretIcon
          className={cn(styles.toggler, { verticalFlip: isOpen })}
          size={16}
        />
      </span>
      <div
        className={styles.collapseable}
        ref={contentHeight}
        style={{
          maxHeight: isOpen ? `${contentHeight.current?.scrollHeight}px` : '0',
        }}
      >
        {isSingleItem ? (
          body // Render body as-is for single title-body pair
        ) : (
          <Typography
            className={styles.description}
            size="s"
            tag={bodyTag}
            weight="semiLight"
          >
            {body}
          </Typography>
        )}
      </div>
    </li>
  )
}
