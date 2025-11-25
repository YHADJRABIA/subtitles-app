import { create } from 'zustand'

interface SeriesSearchState {
  query: string
  setQuery: (query: string) => void
  clearSearch: () => void
}

const useSeriesSearchStore = create<SeriesSearchState>(set => ({
  query: '',
  setQuery: query => set({ query }),
  clearSearch: () => set({ query: '' }),
}))

export const useQuery = () => useSeriesSearchStore(state => state.query)
export const useSetQuery = () => useSeriesSearchStore(state => state.setQuery)
export const useClearSearch = () =>
  useSeriesSearchStore(state => state.clearSearch)

export default useSeriesSearchStore
