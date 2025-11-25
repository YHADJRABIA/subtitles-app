import { create } from 'zustand'
import { Series } from '@/types/series'

interface SeriesSearchState {
  query: string
  suggestions: Series[]
  setQuery: (query: string) => void
  setSuggestions: (suggestions: Series[]) => void
  clearSearch: () => void
}

const useSeriesSearchStore = create<SeriesSearchState>(set => ({
  query: '',
  suggestions: [],
  setQuery: query => set({ query }),
  setSuggestions: suggestions => set({ suggestions }),
  clearSearch: () => set({ query: '', suggestions: [] }),
}))

export const useQuery = () => useSeriesSearchStore(state => state.query)
export const useSetQuery = () => useSeriesSearchStore(state => state.setQuery)
export const useSuggestions = () =>
  useSeriesSearchStore(state => state.suggestions)
export const useClearSearch = () =>
  useSeriesSearchStore(state => state.clearSearch)

// Internal use only
const useSetSuggestions = () =>
  useSeriesSearchStore(state => state.setSuggestions)
export { useSetSuggestions }

export default useSeriesSearchStore
