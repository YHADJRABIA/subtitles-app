import { usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { generateBreadcrumbs } from '@/utils/paths'
import type { BreadcrumbItem } from '@/components/UI/Breadcrumbs'
import { useParams } from 'next/navigation'

const useBreadcrumbs = (): BreadcrumbItem[] => {
  const pathname = usePathname()
  const t = useTranslations('Breadcrumbs')
  const params = useParams()

  return generateBreadcrumbs(pathname, t, params)
}

export default useBreadcrumbs
