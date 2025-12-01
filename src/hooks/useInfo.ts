'use client'

import { Info } from '@/types/info'
import { useState } from 'react'

interface InfoState {
  label: string
  type?: Info
}

const useInfo = () => {
  const [info, setInfo] = useState<InfoState>({ label: '' })

  const setInfoMessage = (label: string, type?: Info) => {
    setInfo({ label, type })
  }

  const clearInfo = () => {
    setInfo({ label: '' })
  }

  return {
    info,
    setInfoMessage,
    clearInfo,
  }
}

export default useInfo
