import Typography from '@/components/UI/Typography'
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('Index')
  return <Typography>Test</Typography>
}
