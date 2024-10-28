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
    <ImSpinner2 {...props} className={cn(styles.root, className)} size={size} />
  )
}

export default Loader
