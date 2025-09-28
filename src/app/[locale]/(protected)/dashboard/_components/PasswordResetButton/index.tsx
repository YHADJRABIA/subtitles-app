import { LinkButton } from '@/components/UI/Button/LinkButton'
import { useTranslations } from 'next-intl'

interface PropTypes {
  email: string
}

const PasswordResetButton = ({ email }: PropTypes) => {
  const t = useTranslations('Dashboard.Settings')

  return (
    <LinkButton
      link={{ href: `/password/recovery?email=${email}` }}
      size="xxs"
      variation="primary"
      weight="semiBold"
    >
      {t('change_password')}
    </LinkButton>
  )
}

export default PasswordResetButton
