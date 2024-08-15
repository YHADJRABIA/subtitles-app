import React from 'react'
import cn from 'classnames'
import styles from './EditableAvatar.module.scss'
import Avatar from '@/components/Avatar/Avatar'
import { MdCameraAlt as CameraIcon } from 'react-icons/md'
import { useTranslations } from 'next-intl'

interface PropTypes {
  src?: string | null
  className?: string
  onEditAvatar: () => void
}

// TODO: finish up
const EditableAvatar = ({ className, src, onEditAvatar }: PropTypes) => {
  const t = useTranslations('EditableAvatar')
  return (
    <div className={cn(styles.root, className)}>
      <Avatar src={src} className={styles.avatar} />
      {/*       <CameraIcon
        size={20}
        className={styles.ctaIcon}
        onClick={onEditAvatar}
        title={t('edit')}
      /> */}
    </div>
  )
}

export default EditableAvatar
