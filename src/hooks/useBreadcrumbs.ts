import { usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { generateBreadcrumbs } from '@/utils/paths'
import type { BreadcrumbItem } from '@/components/UI/Breadcrumbs'

const useBreadcrumbs = (): BreadcrumbItem[] => {
  const pathname = usePathname()
  const t = useTranslations('Breadcrumbs')

  return generateBreadcrumbs(pathname, t)
}

export default useBreadcrumbs
