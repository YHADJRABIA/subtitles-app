import { ImSpinner2 } from 'react-icons/im'
import styles from './Loader.module.scss'

interface PropTypes {
  size?: number
}

const Loader = (props: PropTypes) => {
  const { size } = props
  return <ImSpinner2 {...props} size={size ?? 16} className={styles.root} />
}

export default Loader
