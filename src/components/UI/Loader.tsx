import { ImSpinner2 } from 'react-icons/im'
import styles from './Loader.module.scss'
import cn from 'classnames'

interface PropTypes {
  size?: number
  className?: string
}

const Loader = (props: PropTypes) => {
  const { size, className } = props
  return (
    <ImSpinner2
      {...props}
      size={size ?? 16}
      className={cn(styles.root, className)}
    />
  )
}

export default Loader
