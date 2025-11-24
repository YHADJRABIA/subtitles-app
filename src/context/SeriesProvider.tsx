'use client'

import { createContext, useContext, ReactNode } from 'react'
import { Series } from '@/types/series'

const SeriesContext = createContext<Series[]>([])

interface PropTypes {
  series: Series[]
  children: ReactNode
}

export const useSeriesData = () => useContext(SeriesContext)

const SeriesProvider = ({ series, children }: PropTypes) => {
  return (
    <SeriesContext.Provider value={series}>{children}</SeriesContext.Provider>
  )
}

export default SeriesProvider
