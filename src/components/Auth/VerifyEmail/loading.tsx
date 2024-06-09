import Loader from '@/components/UI/Loader'
import Typography from '@/components/UI/Typography'
import React from 'react'

interface PropTypes {
  label: string
}

const Loading = ({ label }: PropTypes) => {
  return (
    <>
      <Loader size={22} />
      <Typography weight="semiBold">{label}</Typography>
    </>
  )
}

export default Loading
