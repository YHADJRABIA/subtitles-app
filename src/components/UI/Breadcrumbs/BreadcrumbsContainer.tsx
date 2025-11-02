'use client'

import React from 'react'
import Breadcrumbs from '.'
import useBreadcrumbs from '@/hooks/useBreadcrumbs'

interface PropTypes {
  className?: string
}

const BreadcrumbsContainer = ({ className }: PropTypes) => {
  const items = useBreadcrumbs()

  if (!items.length) return null

  return <Breadcrumbs className={className} items={items} />
}

export default BreadcrumbsContainer
