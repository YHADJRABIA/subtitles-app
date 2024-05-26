import Loader from '@/components/UI/Loader'
import Typography from '@/components/UI/Typography'
import React from 'react'

const Loading = () => {
  return (
    <>
      <Loader size={22} />
      <Typography weight="semiBold">Verifying your email</Typography>
    </>
  )
}

export default Loading
