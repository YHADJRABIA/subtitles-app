'use client'
import React from 'react'
import AuthForm from '@/components/Auth/AuthForm'
import { handleCredentialsLogin } from '@/actions/auth'

const LoginPage = () => {
  return <AuthForm type="login" onSubmit={handleCredentialsLogin} />
}

export default LoginPage
