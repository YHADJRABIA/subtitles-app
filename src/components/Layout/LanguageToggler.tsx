'use client'

import { ChangeEvent, useTransition } from 'react'

import styles from './LanguageToggler.module.scss'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const LanguageToggler = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const localActive = useLocale()

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }
  return (
    <>
      <p className={styles.srOnly}>Switch language</p>
      <select
        defaultValue={localActive}
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">En</option>
        <option value="fr">Fr</option>
      </select>
    </>
  )
}

export default LanguageToggler
