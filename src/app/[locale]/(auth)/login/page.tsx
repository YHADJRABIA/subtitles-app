'use client'
import React from 'react'
import AuthForm from '@/components/Auth/AuthForm'
import { handleCredentialsLogin } from '@/lib/auth/actions'

const LoginPage = () => {
  return <AuthForm type="login" onSubmit={handleCredentialsLogin} />
}

export default LoginPage
